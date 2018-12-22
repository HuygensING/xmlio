import BaseXmlio from './index.base';
import handlerDefaults from './handler.defaults';
export { handlerDefaults };
export default class Xmlio extends BaseXmlio {
    export(options: DataExporter): DataNode | DataNode[];
    export(options: TextExporter): string | string[];
    export(options: XmlExporter): string | string[];
    export(options: [DataExporter, XmlExporter]): [DataNode | DataNode[], string | string[]];
    export(options: Exporter[]): ExporterReturnValue[];
    export(): string | string[];
}
