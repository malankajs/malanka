import {webpackResolver, staticResolver} from 'di.js/build/di.es5';
import {BodyContainer} from './components/BodyContainer/BodyContainer';
import {Environment, Model, Collection} from '../es5';

export let diConfig = {
    resolvers: [
        webpackResolver([
            require.context('./models', true, /\.js$/),
            require.context('./collections', true, /\.js$/),
            require.context('./lib', true, /\.js$/),
            require.context('./components', true, /(Page|Header)\.js$/)
        ]),
        staticResolver({
            BodyContainer,
            Environment,
            Model,
            Collection
        })
    ],
    dependencies: {
        // routes

        home: ['!BodyContainer', {
            content: 'homePage'
        }],

        test: ['!BodyContainer', {
            content: 'testPage'
        }],

        // Pages

        BodyContainer: {
            env: 'env',
            header: 'Header'
        },

        homePage: ['HomePage', {
            searchState: 'searchState',
            repositories: 'repositories',
            model: 'model'
        }],

        testPage: ['TestPage', {

        }],
        
        // Components

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
        }],

        router: 'Router'
    }
};