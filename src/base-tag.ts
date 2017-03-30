import {formatTagName} from "./utils";

class Base {
	private className = null;
	private classNames = new Set();
	private data = null;
	private tagName = 'div';

	public close;
	public open;
	public state = null;

	constructor(data, state) {
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

	openAfter() {
		return '';
	}

	closeBefore() {
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

export default Base;
