import BaseTag from "./base";
import {ICustomTag} from "../types";

class XmlTag extends BaseTag implements ICustomTag {
	public open() {
		return `<${this.name()}${this.getAttributes()}>${this.openAfter()}`;
	}

	public close() {
		return `${this.closeBefore()}</${this.name()}>`;
	}

	protected getAttributes() {
		const attrs = this.data.attributes;
		const keys = Object.keys(attrs);

		return keys
			.map((key) => {
				const value = attrs[key];

				return ` ${key}="${value}"`
			})
			.join('');
	}
}

export default XmlTag;
