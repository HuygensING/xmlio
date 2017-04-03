import BaseTag from "./base";
import {ICustomTag} from "../types";

class HtmlTag extends BaseTag implements ICustomTag {
	public open() {
		return `<${this.tagName}${this.classNamesToString()}${this.getAttributes()}>${this.openAfter()}`;
	}

	public close() {
		return `${this.closeBefore()}</${this.tagName}>`;
	}
}

export default HtmlTag;
