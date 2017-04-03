import { ISettings, IState } from "./types";
import HtmlTag from './tags/html';
import JsxTag from './tags/jsx';
import EmptyTag from './tags/empty';
export { EmptyTag, HtmlTag, JsxTag };
declare var _default: (xmlString: string, settings?: ISettings) => Promise<IState>;
export default _default;
