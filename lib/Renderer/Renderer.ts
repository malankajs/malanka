import {RendererElement} from '../declarations';

export abstract class Renderer {
    public abstract removeChild(parent: RendererElement, node: RendererElement): void;
    public abstract createElement(tagName: string):RendererElement;
    public abstract clear(node: RendererElement):void;
    public abstract append(parent: RendererElement, node: RendererElement):void;
    public abstract appendAt(parent: RendererElement, node: RendererElement, index:number):void;
    public abstract setAttribute(node: RendererElement, key: string, value: string):void;
    public abstract addEventListener(node: RendererElement, event: string, callback: (event: Event) => void, options?):void;
    public abstract createTextNode(content?:string):RendererElement;
    public abstract createComment():RendererElement;
    public abstract setContent(node: RendererElement, content: string):void;
    public abstract replaceWith(node: RendererElement, newNode: RendererElement):void;
}
