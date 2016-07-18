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

    initialize() {
        let content = this.content;

        if (!Array.isArray(content)) {
            content = [content];
        }

        this.code = ValueProxy.fromValue(content)
            .pipe(content => content.join('').trim());
    }

    onRender() {
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