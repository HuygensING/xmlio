import {IBaseTag, IOpenTags, ITagSelector} from "../types";
import {compareNodeToSelector} from "../utils";

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

	public containsBy(selector: ITagSelector) {
		return this.tags.find((t) => compareNodeToSelector(t.data)(selector))
	}

	public containsOneOf(selectors: ITagSelector[]) {
		return selectors.some((selector) => this.containsBy(selector));
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
