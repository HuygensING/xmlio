export declare const COLON_REPLACE = "_-_-_-_";
export default class ProxyHandler {
    private doc;
    private parserOptions;
    constructor(doc: XMLDocument, parserOptions: DomParserOptions);
    addProxies(el: Element): Element;
    removeProxies(el: Element): Element;
}
