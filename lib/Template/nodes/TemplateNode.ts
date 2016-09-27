import {TemplateEnvironment} from '../TemplateEnvironment';
import {CompiledString} from '../../declarations';

export class TemplateNode {
    public env: TemplateEnvironment;

    /**
     * @param {TemplateEnvironment} env
     */
    constructor(env) {
        this.env = env;
    }

    public compile():CompiledString {
        return null;
    }
    
}
