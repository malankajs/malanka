import {Events} from '../Data/Events';
import {ValueProxy} from '../Data/ValueProxy';

export class DomWrapper extends Events {

    /**
     * @param {Element} element
     */
    constructor(element) {
        super();

        this._element = element;
        this._events = {};
    }

    /**
     * @param eventName
     * @returns {*}
     */
    event(eventName) {
        let element = this._element;

        if (!this._events[eventName]) {
            this._events[eventName] = new ValueProxy({
                subscribe() {
                    if (element) {
                        this._callback = (event) => {
                            this.emitValue(event);
                        };

                        element.addEventListener(eventName, this._callback);
                    }
                },
                unsubscribe() {
                    if (element) {
                        this._callback = (event) => {
                            this.emitValue(event);
                        };

                        element.removeEventListener(eventName, this._callback);
                    }
                }
            });
        }

        return this._events[eventName];
    }

}