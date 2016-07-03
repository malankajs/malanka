import {Component, Defaults, ValueProxy} from '../../../es5';

import styles from './Code.css';
import template from './Code.hbs';

@Defaults({
    template,
    styles,
    lang: 'javascript',
    tagName: 'pre'
})
export class Code extends Component {

    initialize(options) {
        let content = this.content;

        if (!Array.isArray(content)) {
            content = [content];
        }

        this.code = ValueProxy.fromObject(content)
            .mutate(content => content.join('').trim());
    }

    render(element) {
        super.render(element);

        if (this.env.isBrowser) {
            require([
                'prismjs',
                'prismjs/components/prism-css.js',
                'prismjs/components/prism-handlebars.js',
                '!!style!css!prismjs/themes/prism.css'
            ], (prism) => {
                this.getElement().innerHTML = prism.highlight(this.code.getValue(), prism.languages[this.lang]);
            });
        }
    }

}