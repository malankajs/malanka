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
    off(callback) {
        this._listeners = this._listeners.filter(_callback => _callback !== callback);
        
        return this;
    }

    /**
     * @param {*} value
     *
     * @returns {Events}
     */
    emit(value) {
        for (var index = 0; index < this._listeners.length; index++) {
            this._listeners[index](value);
        }
        
        return this;
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
     * Stop listenings
     * 
     * @returns {Events}
     */
    stopListening() {
        this._listenings.forEach(({obj, callback}) => obj.off(callback));
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