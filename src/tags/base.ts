import {formatTagName} from "../utils";
import {IBaseTag, IState} from "../types";
import {Tag} from "sax";

class BaseTag implements IBaseTag {
	protected className: string;
	protected classNames: Set<string> = new Set();
	protected tagName: string = 'div';

	constructor(public data: Tag, public state: IState) {}

	protected classNamesToString() {
		const className = (this.className == null) ?
			this.data.name.replace(':', '').toLowerCase() :
			this.className;

		if (className.length)	this.classNames.add(className);

		return (this.classNames.size) ?
			` class="${[...this.classNames].join(' ')}"` :
			'';
	}

	protected getAttributes() {
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

	protected openAfter() {
		return '';
	}

	protected closeBefore() {
		return '';
	}
}

export default BaseTag;
