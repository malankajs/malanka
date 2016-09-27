import {TemplateCompiler} from './TemplateCompiler';
import {ComponentsScanner} from '../Build/ComponentsScanner';

export default function(content:string):string {
    let _this = this as ({cacheable: () => void, options: {scanner: ComponentsScanner}});

    _this.cacheable();

    return new TemplateCompiler(_this.options.scanner).compileString(content);
}
