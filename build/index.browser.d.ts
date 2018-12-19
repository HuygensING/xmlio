import BaseXmlio from './index.base';
export default class Xmlio extends BaseXmlio {
    export(options: DataExporterOptions): DataNode | DataNode[];
    export(options: TextExporterOptions): string | string[];
    export(options: XmlExporterOptions): string | string[];
    export(options: [DataExporterOptions, XmlExporterOptions]): [DataNode | DataNode[], string | string[]];
    export(options: Options[]): ExporterReturnValue[];
    export(): string | string[];
}
