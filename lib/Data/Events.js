export class Events {

    constructor() {
        this._listeners = [];
        this._listenings = [];
        this._channels = {};
    }

    /**
     * @param {function} callback
     *
     * @returns {Events}
     */
    on(callback) {
        this._listeners.push(callback);

        return this;
    }

    /**
     * @param {function} callback
     *
     * @returns {Events}
     */
    once(callback) {
        let cb = (...args) => {
            callback(...args);
            this.off(cb);
        };
        return this.on(cb);
    }

    /**
     * @param {function} [callback]
     *
     * @returns {Events}
     */
    off(callback) {
        let length = this._listeners.length;
        for (let index = 0; index < length; ++index) {
            if (!callback || this._listeners[index] === callback) {
                delete this._listeners[index];
            }
        }
        return this;
    }

    /**
     * @param {*} value
     * @param {*} [value1]
     * @param {*} [value2]
     * @param {*} [value3]
     *
     * @returns {Events}
     */
    emit(value, value1, value2, value3) {
        if (this._buffer) {
            this._buffer.push(() => this.emit(value, value1, value2, value3));
        } else {
            let length = this._listeners.length;
            for (let index = 0; index < length; index++) {
                let fn = this._listeners[index];
                if (fn) {
                    fn(value, value1, value2, value3);
                }
            }
        }

        return this;
    }

    /**
     * @param {string} channel
     * @param {*} value
     * @param {*} [value1]
     * @param {*} [value2]
     * @param {*} [value3]
     */
    emitToChannel(channel, value, value1, value2, value3) {
        if (this._buffer) {
            this._buffer.push(() => this.emitToChannel(channel, value, value1, value2, value3));
        } else {
            if (this._channels[channel]) {
                this._channels[channel].emit(value, value1, value2, value3);
            }
        }
    }

    /**
     * Buffer all events and flush
     *
     * @param {function} callback
     */
    emitBuffer(callback) {
        let currentBuffer = this._buffer,
            buffer = this._buffer = [];

        try {
            callback();

            this._buffer = currentBuffer;
            buffer.forEach(event => event());
        } catch (err) {
            this._buffer = currentBuffer;

            throw err;
        }
    }

    /**
     * @param {Events} obj
     * @param {function} callback
     *
     * @returns {Events}
     */
    listenTo(obj, callback) {
        this._listenings.push({obj, callback});

        obj.on(callback);

        return this;
    }

    /**
     * @param {Events} obj
     * @param {function} callback
     *
     * @returns {Events}
     */
    listenToOnce(obj, callback) {
        let cb = (...args) => {
            callback(...args);
            this.stopListening(obj, cb);
        };
        return this.listenTo(obj, cb);
    }

    /**
     * Stop listening's
     *
     * @param {{}} [listenObject]
     * @param {function} [callback]
     *
     * @returns {Events}
     */
    stopListening(listenObject, callback) {
        this._listenings.forEach(({obj, callback: cb}) => {
            if ((!listenObject || obj === listenObject) && (!callback || callback === cb)) {
                obj.off(cb);
            }
        });

        return this;
    }

    /**
     * @param {string} name
     *
     * @returns {Events}
     */
    channel(name) {
        if (!this._channels[name]) {
            this._channels[name] = new Events();
        }

        return this._channels[name];
    }

}
