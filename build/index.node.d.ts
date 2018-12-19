import BaseXmlio from './index.base';
export default class Xmlio extends BaseXmlio {
    export(options: DataExporterOptions): Promise<DataNode | DataNode[]>;
    export(options: TextExporterOptions): Promise<string | string[]>;
    export(options: XmlExporterOptions): Promise<string | string[]>;
    export(options: [DataExporterOptions, XmlExporterOptions]): Promise<[DataNode | DataNode[], string | string[]]>;
    export(options: Options[]): Promise<ExporterReturnValue[]>;
    export(): Promise<string | string[]>;
}
