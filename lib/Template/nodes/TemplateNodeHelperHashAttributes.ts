import {TemplateNode} from './TemplateNode';
import {TemplateNodeAbstractAttribute} from './TemplateNodeAbstractAttribute';
import {TemplateEnvironment} from '../TemplateEnvironment';

export class TemplateNodeHelperHashAttributes extends TemplateNode {
    protected nodes:TemplateNodeAbstractAttribute[];

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     */
    constructor(nodes, env:TemplateEnvironment) {
        super(env);

        this.nodes = nodes;
    }

    /**
     * @returns {{}}
     */
    public compileHash():Object {
        return this.env.scope({isString: true}, () => {
            let hash = ({} as {events: Object}),
                events = {};

            this.nodes.forEach(attr => {
                if (attr.isEvent()) {
                    Object.assign(events, attr.compileEvent());
                } else {
                    Object.assign(hash, attr.compileHash());
                }
            });

            if (Object.keys(events).length) {
                hash.events = this.env.compileHash(events);
            }

            return hash;
        });
    }

    /**
     * @returns {boolean}
     */
    public isEmpty():boolean {
        return !this.nodes.length;
    }

    /**
     */
    public getContext():TemplateNode {
        let context = this.nodes.find(node => node.name === 'as');

        if (context) {
            return context.value;
        }
    }

    /**
     */
    public getScope():TemplateNode {
        let scope = this.nodes.find(node => node.name === 'scope');

        if (scope) {
            return scope.value;
        }
    }

    /**
     * @param {{}[]} nodes
     * @param {TemplateEnvironment} env
     *
     * @returns {TemplateNodeHelperHashAttributes}
     */
    static factory(nodes, env:TemplateEnvironment) {
        nodes = nodes.map(node => env.factoryHelperHashAttribute(node));

        return new TemplateNodeHelperHashAttributes(nodes, env);
    }

}
