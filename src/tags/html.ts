import BaseTag from "./base";
import {ICustomTag} from "../types";

class HtmlTag extends BaseTag implements ICustomTag {
	public open() {
		return `<${this.name()}${this.classNamesToString()}${this.getAttributes()}>${this.openAfter()}`;
	}

	public close() {
		return `${this.closeBefore()}</${this.name()}>`;
	}

	public name(): string {
		return 'div';
	}
}

export default HtmlTag;
