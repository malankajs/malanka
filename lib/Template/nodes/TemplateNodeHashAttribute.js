import {TemplateNodeAbstractAttribute} from './TemplateNodeAbstractAttribute';

export class TemplateNodeHashAttribute extends TemplateNodeAbstractAttribute {

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