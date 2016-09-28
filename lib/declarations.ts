import {Model} from './Data/Model';
import {AbstractComponent} from './Components/AbstractComponent';
import {ValueProxy} from './Data/ValueProxy';
import {TemplateNodePath} from './Template/nodes/TemplateNodePath';
import {AbstractRequest} from './Request/AbstractRequest';
import {Collection} from './Data/Collection';
import {StringNode, CommentNode} from './Renderer/StringRenderer';
import {Events} from './Data/Events';

export interface ComponentOptions extends Object {
    tagName?: string;
    className?: string;
    events?: Object;
    attributes?: Object;
    content?: TemplateContent|TemplateFunction;
    model?:Model;
    [propName: string]: any;
}

export declare type TemplateType = string|number|null|undefined|AbstractComponent|ValueProxy<any>;
export declare type TemplateContent = TemplateType|TemplateType[];
export declare type TemplateFunction = (context:AbstractComponent) => TemplateContent;
export declare type CollectionComponentCollection = Collection<Model>|ValueProxy<Object[]>|Object[];
export declare type RendererElement = Node|Text|StringNode|CommentNode;
export declare type CompiledString = string|({toString: () => string, isArray?: boolean, length?: number}|TemplateHash);

export interface TemplateNodeHelperOptions {
    hash: string|TemplateHash;
    isString?: boolean;
}

export interface TemplateNodeBlockHelperOptions extends TemplateNodeHelperOptions {
    content: CompiledString;
    inverse: CompiledString;
}

export interface TemplateNodeVarAST {
    path: TemplateNodePath;
}

export interface TemplateNodeComponentParams {
    tagName: string;
    attributes: Object;
    events: Object;
    content: CompiledString;
    options?: Object;
}

export interface TemplateNodeComponentPragma {
    bundle: boolean;
    async: boolean;
    asyncAvoidComponent: boolean;
}

export interface TemplateNodeStringAST {
    content: string;
}

export interface RouterEvent {
    name: string;
    params: Object;
    query: Object;
}

export interface CollectionOptions {
    request?: AbstractRequest
}

export interface CollectionMergeOptions {
    silent?: boolean;
    reset?: boolean;
    remove?: boolean;
    parse?: boolean;
}

export interface CollectionFetchOptions {
    url?: string;
    query?: Object;
    force?: Boolean;
}

export interface EventsListenings {
    obj : Events;
    callback: (value:any) => void
}

export interface ModelOptions {
    parse: (data:Object) => Object
    request: AbstractRequest
}

export interface AbstractRequestOptions {
    url: string;
    data?: Object;
    query?: Object;
    body?: Object;
    headers?: Object;
    method?: string;
}

export declare interface TemplateHash {
    toString: () => string;
    hash: Object;
    length: number;
}

export declare interface TemplateScope {
    scope?: string;
    isString?: boolean;
    watchers?: Object;
    context?: string;
}
