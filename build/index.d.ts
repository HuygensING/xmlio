/// <reference path="../src/default.d.ts" />
/// <reference path="../src/exporters.d.ts" />
/// <reference path="../src/actions.d.ts" />
export declare function logWarning(warning: string): void;
export default class Xmlio {
    private xml;
    private parserOptions?;
    private transforms;
    constructor(xml: string, parserOptions?: DomParserOptions);
    export(options: DataExporterOptions): Promise<DataNode | DataNode[]>;
    export(options: TextExporterOptions): Promise<string | string[]>;
    export(options: XmlExporterOptions): Promise<string | string[]>;
    export(options: [DataExporterOptions, XmlExporterOptions]): Promise<[DataNode | DataNode[], string | string[]]>;
    export(options: Options[]): Promise<ExporterReturnValue[]>;
    export(): Promise<string | string[]>;
    change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): Xmlio;
    rename(selector: string, newName: string): Xmlio;
    exclude(selector: string | string[]): Xmlio;
    replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource?: boolean): Xmlio;
    select(selector: string): Xmlio;
}
