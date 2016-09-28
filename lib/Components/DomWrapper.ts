import {Events} from '../Data/Events';
import {ValueProxy} from '../Data/ValueProxy';

export class DomWrapper<T extends Node|Window> extends Events {
    protected _element: T;
    protected _events: Object;

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
    public event(eventName):ValueProxy<Event> {
        let element = this._element;

        if (!this._events[eventName]) {
            let event = this._events[eventName] = new ValueProxy({
                subscribe() {
                    if (element) {
                        this._callback = (event) => {
                            event.emitValue(event);
                        };

                        element.addEventListener(eventName, this._callback);
                    }
                },
                unsubscribe() {
                    if (element && this._callback) {
                        element.removeEventListener(eventName, this._callback);
                    }
                }
            });
        }

        return this._events[eventName];
    }

}
