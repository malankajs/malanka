import {Planner} from './Planner';
import {EventsListenings} from '../declarations';

export class Events {
    protected _generation : number;
    protected _listeners : Function[];
    protected _listenings : EventsListenings[];
    protected _channels : Object;
    protected _eventDebounce : Function;

    constructor() {
        this._generation = 0;
        this._listeners = [];
        this._listenings = [];
        this._channels = {};
    }

    /**
     * @param {function} callback
     *
     * @returns {Events}
     */
    on(callback) : Events {
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
    off(callback?:Function) {
        if (callback) {
            this._listeners = this._listeners.filter(cb => cb !== callback);
        } else {
            this._listeners = [];
        }
    }

    /**
     * @param {*} value
     * @param {*} [value1]
     * @param {*} [value2]
     * @param {*} [value3]
     *
     * @returns {Events}
     */
    emit(value:any, value1?, value2?, value3?) {
        this._emit(() => {
            let listeners = this._listeners,
                length = listeners.length;

            for (let index = 0; index < length; index++) {
                listeners[index](value, value1, value2, value3);
            }
        });

        return this;
    }

    /**
     * @param {string} channel
     * @param {*} value
     * @param {*} [value1]
     * @param {*} [value2]
     * @param {*} [value3]
     *
     * @returns {Events}
     */
    emitToChannel(channel:string, value, value1?, value2?, value3?) {
        if (this._channels[channel]) {
            this._channels[channel].emit(value, value1, value2, value3);
        }

        return this;
    }


    /**
     * @param {function} callback
     * @private
     */
    _emit(callback) {
        if (!this._eventDebounce) {
            this._eventDebounce = Planner.debounce(this._generation);
        }

        this._eventDebounce(callback);
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
    stopListening(listenObject?:Events, callback?:Function) {
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
            let channel = this._channels[name] = new Events();
            channel._generation = this._generation + 1;
        }

        return this._channels[name];
    }

}
