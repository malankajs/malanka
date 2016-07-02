import {Component, Defaults, ValueProxy, Model} from '../../../es5';

import template from './Tabs.hbs';
import styles from './Tabs.css';

@Defaults({styles, template})
export class Tabs extends Component {

    initialize() {
        this.body = {};
        
        this.state = new Model({
            active: this.active
        });
        
        var activeProxy = this.state.proxy('active');

        this.currentBody = activeProxy.mutate((value) => {
            return this.body[value];
        });

        this.tabs = ValueProxy.fromObject(this.body).mutate((value) => {
            return Object.keys(value).map(tab => {
                return activeProxy.mutate((state) => {
                    return {
                        id: tab,
                        title: this[tab],
                        active: tab === state
                    };
                });
            });
        });
        
        this.tabsContent = ValueProxy.fromObject(this.body).mutate((value) => {
            return Object.keys(value).map(tab => {
                return {
                    id: tab,
                    content: this.body[tab],
                    proxy() {
                        return activeProxy.mutate(state => state === tab);
                    }
                };
            });
        })
    }

    onClick(event) {
        this.state.set('active', event.currentTarget.dataset.tab);
    }
}