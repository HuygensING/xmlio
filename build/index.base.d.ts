/// <reference path="../src/default.d.ts" />
/// <reference path="../src/handlers.d.ts" />
/// <reference path="../src/exporters.d.ts" />
/// <reference path="../src/transformers.d.ts" />
import BrowserXmlio from './index.browser';
import NodeXmlio from './index.node';
declare type Api = BrowserXmlio | NodeXmlio;
export default abstract class BaseXmlio {
    protected xml: string;
    protected parserOptions?: DomParserOptions;
    protected transformers: XMLioTransformer[];
    constructor(xml: string, parserOptions?: DomParserOptions);
    abstract export(options?: any): any;
    addTransform(transform: XMLioTransformer): this;
    change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): Api;
    rename(selector: string, newName: string): Api;
    exclude(selector: string | string[]): Api;
    replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource?: boolean): Api;
    select(selector: string): Api;
}
export {};
