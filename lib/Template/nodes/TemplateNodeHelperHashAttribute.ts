import {TemplateNodeAbstractAttribute} from './TemplateNodeAbstractAttribute';

export class TemplateNodeHelperHashAttribute extends TemplateNodeAbstractAttribute {

    /**
     * @returns {{}}
     */
    public compileHash(): Object {
        let {name, value} = this;

        if (name !== 'as' && name !== 'scope') {
            return {
                [name]: value.compile()
            };
        } else {
            return {};
        }
    }

}
