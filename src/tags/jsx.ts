import {formatTagName} from "../utils";
import BaseTag from "./base";
import {ICustomTag} from "../types";

class JsxTag extends BaseTag implements ICustomTag {
	protected passProps = false;

	constructor(data, state) {
		super(data, state);
		this.tagName = formatTagName(this.data.name);
		if (state.writeToOutput) state.usedTags.add(this.tagName);
	}

	public open() {
		const slash = this.data.isSelfClosing ? '/' : '';
		const className = (this.className != null) ?
			` className="${this.className}"` :
			'';

		const props = this.passProps ? ' {...props}' : '';

		return `<${this.tagName}${className}${this.getAttributes()}${props}${slash}>${this.openAfter()}`;
	}

	public close() {
		return this.data.isSelfClosing ?
			'' :
			`${this.closeBefore()}</${this.tagName}>`;
	}
}

export default JsxTag;
