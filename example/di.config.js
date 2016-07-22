import {webpackResolver, staticResolver} from 'di.js/build/di.es5';
import {BodyContainer} from './components/BodyContainer/BodyContainer';
import {Environment, Model, Collection, Planner} from '../es5';

export let diConfig = {
    resolvers: [
        webpackResolver([
            require.context('./models', true, /\.js$/),
            require.context('./collections', true, /\.js$/),
            require.context('./lib', true, /\.js$/),
            require.context('./components', true, /(Header)\.js$/),
            require.context('bundle!./components', true, /Page\.js$/)
        ]),
        staticResolver({
            BodyContainer,
            Environment,
            Collection,
            Planner,
            Model
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

        todo: ['!BodyContainer', {
            content: 'todoPage'
        }],

        error: ['!BodyContainer', {
            content: 'errorPage'
        }],

        // Pages

        BodyContainer: {
            env: 'env',
            header: 'Header'
        },

        homePage: ['HomePage', {
            model: 'model'
        }],

        todoPage: ['TodoPage', {
            tasks: 'Tasks'
        }],

        testPage: ['TestPage', {
            searchState: 'searchState',
            repositories: 'repositories',
            calc: 'Calc'
        }],

        errorPage: ['ErrorPage', {

        }],
        
        // Components

        // Data models & collections
        
        model: 'Model',
        
        repositories: ['Repositories', {
            searchState: 'searchState',
            request: 'request'
        }],

        // States

        searchState: ['SearchState', {
            router: 'router'
        }],

        // Infrastructure

        env: ['Environment', {
            renderer: 'renderer',
            router: 'router',
            planner: 'Planner'
        }],

        router: 'Router'
    }
};