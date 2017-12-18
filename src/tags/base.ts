import {Tag as SaxTag} from "sax"
import State from '../state'

abstract class BaseTag {
	protected className: string;
	protected classNames: Set<string> = new Set();

	public abstract close(): string
	public abstract open(): string

	// ToDo rename data to node
	constructor(public data: SaxTag, public state: State) {}

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

	public name(): string {
		return this.data.name;
	}
}

export default BaseTag;
