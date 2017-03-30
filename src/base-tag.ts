import {formatTagName} from "./utils";
import {IBaseTag, IState} from "../index";
import {Tag} from "sax";

class BaseTag implements IBaseTag {
	private className: string;
	private classNames: Set<string> = new Set();
	private data: Tag;
	private tagName: string = 'div';

	public close;
	public open;
	public state;

	constructor(data: Tag, state: IState) {
		this.data = data;
		this.state = state;

		this.open = state.jsx ? this.openJSX : this.openHTML;
		this.close = state.jsx ? this.closeJSX : this.closeHTML;

		if (state.jsx) {
			this.tagName = formatTagName(this.data.name);
		}

		if (state.writeToOutput) state.usedTags.add(this.tagName);
	}

	private classNamesToString() {
		const className = (this.className == null) ?
			this.data.name.replace(':', '').toLowerCase() :
			this.className;

		if (className.length)	this.classNames.add(className);

		return (this.classNames.size) ?
			` class="${[...this.classNames].join(' ')}"` :
			'';
	}

	private getAttributes() {
		const attrs = this.data.attributes;
		const keys = Object.keys(attrs);

		return keys
			.map((key) => {
				const value = attrs[key];

				// Rename the key if necessary
				key = key.replace(':', '-');

				return ` data-${key}="${value}"`
			})
			.join('');
	}

	private openHTML() {
		return `<${this.tagName}${this.classNamesToString()}${this.getAttributes()}>${this.openAfter()}`;
	}

	private openJSX() {
		const slash = this.data.isSelfClosing ? '/' : '';
		return `<${this.tagName}${this.getAttributes()}${slash}>${this.openAfter()}`;
	}

	protected openAfter() {
		return '';
	}

	protected closeBefore() {
		return '';
	}

	private closeHTML() {
		return `${this.closeBefore()}</${this.tagName}>`;
	}

	private closeJSX() {
		return this.data.isSelfClosing ?
			'' :
			`${this.closeBefore()}</${this.tagName}>`;
	}
}

export default BaseTag;
