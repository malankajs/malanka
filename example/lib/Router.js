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

        var session;

        router.use(
            event => {
                session = di.session({event});

            },
            (event, err) => {
                session = di.session({event});
                throw err;
            }
        );

        router.use(event => {
            return then(session(event.name), page => {
                event.page = page;
            });
        });

        router.use(null, (event, err) => {
            return then(session('error', {exception: err}), (page) => {
                event.page = page;
            });
        });

        router.use(() => session.close());

        return router;
    }

}