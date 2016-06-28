import {webpackResolver, staticResolver} from 'di.js/build/di.es5';
import {Page} from './components/Page/Page';
import {Environment} from '../es5';

export let diConfig = {
    resolvers: [
        webpackResolver([
            require.context('./models', true, /\.js$/),
            require.context('./collections', true, /\.js$/)
        ]),
        staticResolver({
            Page,
            Environment
        })
    ],
    dependencies: {
        // Components

        page: ['Page', {
            searchState: 'searchState',
            repositories: 'repositories'
        }],

        // Data models & collections

        repositories: ['Repositories', {
            searchState: 'searchState',
            request: 'request'
        }],

        // States

        searchState: 'SearchState',

        // Infrastructure

        env: ['Environment', {
            renderer: 'renderer'
        }]
    }
};