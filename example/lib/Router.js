import {Router as AbstractRouter} from '../../es5/Router';
import {then} from 'di.js/build/di.es5';

export class Router extends AbstractRouter {

    /**
     * @param di
     * @returns {Router}
     */
    static factory({di}) {
        let router = new Router({
            routes: {
                '/': 'home',
                '/test': 'test',
                '/todo': 'todo'
            }
        });

        let session;

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
            return then(di('env'), env => {
                return then(session(event.name, {env}), page => {
                    event.page = page;
                });
            });
        });

        router.use(null, (event, err) => {
            return then(session('error', {exception: err}), (page) => {
                event.page = page;
            });
        });

        router.use(
            () => session.close(),
            (error) => {
                session.close();
                throw error;
            }
        );

        return router;
    }

}