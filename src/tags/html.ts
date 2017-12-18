import BaseTag from "./base";

class HtmlTag extends BaseTag {
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
