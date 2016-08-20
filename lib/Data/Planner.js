export class Planner {

    constructor() {
        this._commitQueue = [];
    }

    /**
     * @returns {{commit: function(function)}}
     */
    atom() {
        let _this = this,
            _callback = undefined;

        return {
            commit(callback) {
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
                this._timer = requestAnimationFrame(() => this._flush());
            }
        } else {
            this._flush();
        }
    }

    /**
     * Flush changes
     *
     * @private
     */
    _flush() {
        let queue = this._commitQueue;

        this._timer = null;
        this._commitQueue = [];

        for (var index = 0; index < queue.length; index++) {
            try {
                queue[index]();
            } catch(err) {
                console.error(err);
            }
        }
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

}