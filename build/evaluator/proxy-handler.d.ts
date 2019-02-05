export declare const COLON_REPLACE = "_-_-_-_";
export default class ProxyHandler {
    private parserOptions;
    private proxyAttributeElements;
    constructor(parserOptions: DomParserOptions);
    addProxies(el: Element): Element;
    removeProxies(el: Element): Element;
}
