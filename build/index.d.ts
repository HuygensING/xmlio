import { ISettings, IState } from "./types";
import EmptyTag from './tags/empty';
import HtmlTag from './tags/html';
import JsxTag from './tags/jsx';
import XmlTag from './tags/xml';
export { EmptyTag, HtmlTag, JsxTag, XmlTag };
declare const _default: (xmlString: string, settings?: ISettings) => Promise<IState>;
export default _default;
