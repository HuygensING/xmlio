import BaseXmlio from './index.base';
export default class Xmlio extends BaseXmlio {
    export(options: DataExporter): Promise<DataNode | DataNode[]>;
    export(options: TextExporter): Promise<string | string[]>;
    export(options: XmlExporter): Promise<string | string[]>;
    export(options: [DataExporter, XmlExporter]): Promise<[DataNode | DataNode[], string | string[]]>;
    export(options: Exporter[]): Promise<ExporterReturnValue[]>;
    export(): Promise<string | string[]>;
}
