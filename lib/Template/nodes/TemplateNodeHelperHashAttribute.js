import {TemplateNodeAbstractAttribute} from './TemplateNodeAbstractAttribute';

export class TemplateNodeHelperHashAttribute extends TemplateNodeAbstractAttribute {

    /**
     * @returns {{}}
     */
    compileHash() {
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
