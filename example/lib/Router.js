import {AbstractRouter} from './AbstractRouter';
import {then} from 'di.js/build/di.es5';

export class Router extends AbstractRouter {

    /**
     * @param di
     * @returns {Router}
     */
    static factory({di}) {
        var router = new Router({
            routes: {
                '/': 'home'
            }
        });

        router.use(event => {
            return then(di(event.name, {event}), page => {
                event.page = page;
            });
        });

        return router;
    }
    
}