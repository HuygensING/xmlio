import {IBaseTag, IOpenTags} from "../types";

class OpenTags implements IOpenTags {
	private tags = [];

	public add(tag: IBaseTag) {
		this.tags.push(tag);
	}

	public remove() {
		return this.tags.pop();
	}

	public contains(tagName) {
		return this.tags.find((tag) => tag.data.name === tagName) != null;
	}

	public containsBy(tagName, attributeKey, attributeValue) {
		return this.tags.find((t) =>
				t.data.name === tagName &&
				t.data.attributes.hasOwnProperty(attributeKey) &&
				t.data.attributes[attributeKey] === attributeValue
			) != null;
	}

	public containsOneOf(tagNames) {
		return tagNames.some((tagName) => this.contains(tagName));
	}

	public count() {
		return this.tags.length;
	}

	public countType(tagName) {
		return this.tags.filter((tag) => tag.data.name === tagName).length;
	}

	public lastOfType(tagName) {
		return [...this.tags].reverse().find((tag) => tag.data.name === tagName);
	}

	public log() {
		return this.tags.map((t) => t.data.name).join(', ');
	}
}

export default OpenTags;
