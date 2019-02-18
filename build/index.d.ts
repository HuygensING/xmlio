/// <reference path="../src/default.d.ts" />
/// <reference path="../src/handlers.d.ts" />
/// <reference path="../src/exporters.d.ts" />
/// <reference path="../src/transformers.d.ts" />
import handlerDefaults from './handler.defaults';
export { handlerDefaults };
export default class XMLio {
    private doc;
    private parserOptions?;
    private root;
    private transformers;
    private trees;
    private proxyHandler;
    constructor(doc: XMLDocument, parserOptions?: DomParserOptions);
    export(options: DataExporter): DataNode | DataNode[];
    export(options: TextExporter): string | string[];
    export(options: XmlExporter): string | string[];
    export(options: DomExporter): XMLDocument | XMLDocument[];
    export(options: [DataExporter, XmlExporter]): [DataNode | DataNode[], string | string[]];
    export(options: Exporter[]): ExporterReturnValue[];
    export(): string | string[];
    persist(): XMLio;
    private reset;
    private createOutput;
    private renameTransformer;
    private selectTransformer;
    private applyTransformers;
    addTransform(transformer: XMLioTransformer): this;
    change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): XMLio;
    rename(selector: string, newName: string): XMLio;
    exclude(selector: string | string[]): XMLio;
    replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource?: boolean): XMLio;
    select(selector: string): XMLio;
}
