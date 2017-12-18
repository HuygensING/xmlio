import BaseTag from "./base";

class XmlTag extends BaseTag {
	public open() {
		return `<${this.name()}${this.getAttributes()}>${this.openAfter()}`
	}

	public close() {
		return `${this.closeBefore()}</${this.name()}>`
	}

	protected getAttributes() {
		const attrs = this.data.attributes
		return Object.keys(attrs)
			.map((key) => ` ${key}="${attrs[key]}"`)
			.join('')
	}
}

export default XmlTag;
