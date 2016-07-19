export class Planner {

    constructor() {
        this._commitQueue = [];
    }

    /**
     * @returns {{commit: function(function)}}
     */
    atom() {
        let _this = this,
            _callback;

        return {
            commit(callback) {
                let hasTask = _callback;

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
        this._timer = null;

        for (var index = 0; index < this._commitQueue.length; index++) {
            this._commitQueue[index]();
        }

        this._commitQueue = [];
    }

}