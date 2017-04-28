import {convertColon, formatTagName} from "../utils";
import BaseTag from "./base";
import {ICustomTag} from "../types";

class JsxTag extends BaseTag implements ICustomTag {
	protected passProps = false;

	constructor(data, state) {
		super(data, state);

		if (state.writeToOutput) state.usedTags.add(this.name());
	}

	public open() {
		const slash = this.data.isSelfClosing ? '/' : '';
		const className = (this.className != null) ?
			` className="${this.className}"` :
			'';

		const props = this.passProps ? ' {...props}' : '';

		return `<${this.name()}${className}${this.getAttributes()}${props}${slash}>${this.openAfter()}`;
	}

	public close() {
		return this.data.isSelfClosing ?
			'' :
			`${this.closeBefore()}</${this.name()}>`;
	}

	public name() {
		return formatTagName(this.data.name);
	}

	protected getAttributes() {
		const attrs = this.data.attributes;
		const keys = Object.keys(attrs);

		return keys
			.map((key) => {
				const value = attrs[key];

				// Rename the key if necessary
				// key = key.replace(':', '-');
				key = convertColon(key);

				return ` ${key}="${value}"`
			})
			.join('');
	}
}

export default JsxTag;
