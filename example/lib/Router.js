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
                '/': 'home',
                '/test': 'test'
            }
        });

        router.use(event => {
            let session = di.session({event});

            return then(session(event.name), page => {
                event.page = page;
                session.close();
            });
        });

        return router;
    }
    
}