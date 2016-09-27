export class Planner {
    private _lockEnabled : boolean;
    private _flushActive : boolean;
    private _lockCounter : number;
    private _commitQueue : any[];
    private _queue : any[];
    private _timer : number;

    private static instance : Planner;

    constructor() {
        this._lockEnabled = false;
        this._flushActive = false;
        this._lockCounter = 0;
        this._commitQueue = [];
        this._queue = [];
    }

    /**
     * @returns {{commit: function(function)}}
     */
    atom() {
        let _this = this,
            _callback : () => void;

        return {
            commit(callback:() => void) {
                let hasTask = Boolean(_callback);

                _callback = callback;

                if (!hasTask) {
                    _this.commit(() => {
                        _callback();
                        _callback = undefined;
                    });
                }

                return this;
            }
        };
    }

    /**
     * Create commit wrapper
     *
     * @param {function(...[*])} callback
     *
     * @returns {function(...[*])}
     */
    commitWrapper(callback) {
        let atom = this.atom();

        return (...args) => {
            atom.commit(() => callback(...args));
        }
    }

    /**
     * @param {function} callback
     */
    commit(callback) {
        this._commitQueue.push(callback);

        if (typeof requestAnimationFrame === 'function') {
            if (!this._timer) {
                this._timer = requestAnimationFrame(() => this.flushAsync());
            }
        } else {
            this.flushAsync();
        }
    }

    /**
     * Flush changes
     */
    flushAsync() {
        let queue = this._commitQueue;

        this._timer = null;
        this._commitQueue = [];

        this._invokeCallbacks(queue);
    }

    /**
     * Flush changes
     */
    flush() {
        // prevent flush during flush
        if (this._flushActive) {
            return;
        }

        this._flushActive = true;

        while (this._queue.length) {
            let {callbacks} = this._queue.shift();

            try {
                this._invokeCallbacks(callbacks);
            } catch (err) {
                console.error(err);
            }
        }

        this._flushActive = false;
    }

    /**
     * @param {function[]} callbacks
     * @private
     */
    _invokeCallbacks(callbacks) {
        for (let i = 0; i < callbacks.length; i++) {
            (0, callbacks[i])();
        }
    }

    /**
     * Create lock for events
     *
     * @param {function} callback
     */
    lock(callback) {
        if (!this._lockEnabled) {
            return callback();
        }

        this._lockCounter++;

        try {
            callback();
        } catch (err) {
            console.error(err);
        }

        this._lockCounter--;

        if (!this._lockCounter) {
            this.flush();
        }
    }

    /**
     * @param {number} generation
     * @param {function} callback
     *
     * @returns {*}
     */
    plan(generation, callback) {
        if (!this._lockEnabled) {
            return callback();
        }

        if (this._lockCounter || this._flushActive) {
            let queue = this._queue,
                length = queue.length;

            for (let i = 0; i < length; i++) {
                let level = queue[i];

                if (level.generation === generation) {
                    return level.callbacks.push(callback);
                }

                if (level.generation > generation) {
                    return queue.splice(i, 0, {
                        generation,
                        callbacks: [callback]
                    });
                }
            }

            queue.push({
                generation,
                callbacks: [callback]
            });
        } else {
            // if no lock presented start lock
            this.lock(() => {
                this.plan(generation, callback);
            });
        }
    }

    /**
     * Return debounced callback
     *
     * @param {number} generation
     * @returns {function(function(*))}
     */
    debounce(generation) {
        let planned = false,
            _callback;

        return (callback) => {
            _callback = callback;

            if (!planned) {
                planned = true;

                this.plan(generation, () => {
                    planned = false;
                    _callback();
                });
            }
        };
    }

    /**
     * @param generation
     * @returns {function(Function)}
     */
    static debounce(generation) {
        return this.getInstance().debounce(generation);
    }

    /**
     * @returns {Planner}
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new Planner();
        }

        return this.instance;
    }

    /**
     * Start debounce logic
     */
    static enableLock() {
        this.getInstance()._lockEnabled = true;
    }

    /**
     * Start debounce logic
     */
    static disableLock() {
        this.getInstance()._lockEnabled = false;
    }

    /**
     * @param {function} callback
     */
    static lock(callback) {
        this.getInstance().lock(callback);
    }
}
