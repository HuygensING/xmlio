export declare const COLON_REPLACE = "_-_-_-_";
export default class ProxyHandler {
    private parserOptions;
    constructor(doc: XMLDocument, parserOptions: DomParserOptions);
    addProxies(doc: XMLDocument): XMLDocument;
    removeProxies(doc: XMLDocument): XMLDocument;
}
