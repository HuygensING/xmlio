import { Tag as SaxTag } from 'sax'
import State from '../state'
import {convertColon, formatTagName} from "../utils";
import BaseTag from "./base";

class JsxTag extends BaseTag {
	protected passProps = false;

	constructor(data: SaxTag, state: State) {
		super(data, state);

		if (state.settings.writeToOutput) state.usedTags.add(this.name());
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

				key = convertColon(key);
				if (key === 'key') key = 'xmlKey';

				return ` ${key}="${value}"`
			})
			.join('');
	}
}

export default JsxTag;
