import {webpackResolver, staticResolver} from 'di.js/build/di.es5';
import {Page} from './components/Page/Page';
import {Environment, Model, Collection} from '../es5';

export let diConfig = {
    resolvers: [
        webpackResolver([
            require.context('./models', true, /\.js$/),
            require.context('./collections', true, /\.js$/)
        ]),
        staticResolver({
            Page,
            Environment,
            Model,
            Collection
        })
    ],
    dependencies: {
        // Components

        page: ['Page', {
            searchState: 'searchState',
            repositories: 'repositories',
            model: 'model'
        }],

        // Data models & collections
        
        model: 'Model',
        
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