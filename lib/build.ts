// plugins
import {TemplateRequirePlugin} from './Template/plugins/TemplateRequirePlugin';
import {TemplateCSSModulesPlugin} from './Template/plugins/TemplateCSSModulesPlugin';
import {TemplateFlattenPlugin} from './Template/plugins/TemplateFlattenPlugin';
import {TemplateTrimSpacesPlugin} from './Template/plugins/TemplateTrimSpacesPlugin';

export let plugins = {
    TemplateRequirePlugin,
    TemplateCSSModulesPlugin,
    TemplateFlattenPlugin,
    TemplateTrimSpacesPlugin
};

export {TemplateCompiler} from './Template/TemplateCompiler';
export {ComponentsScanner} from './Build/ComponentsScanner';
