import { compareNodeToSelector } from "../utils"
import { SaxTagSelector } from "../types";
import { TagInstance } from "./setttings";

class OpenTags {
	private tags: TagInstance[] = [];

	public add(tag: TagInstance) {
		this.tags.push(tag);
	}

	public remove(): TagInstance {
		return this.tags.pop();
	}

	public contains(tagName: string): boolean {
		return this.tags.find((tag) => tag.data.name === tagName) != null
	}

	public containsBy(selector: SaxTagSelector): boolean {
		return this.tags.find((t) => compareNodeToSelector(t.data)(selector)) != null
	}

	public containsOneOf(selectors: SaxTagSelector[]): boolean {
		return selectors.some((selector) => this.containsBy(selector));
	}

	public count(): number {
		return this.tags.length;
	}

	public countType(tagName: string): number {
		return this.tags.filter((tag) => tag.data.name === tagName).length;
	}

	public last(): TagInstance {
		return this.tags[this.count() - 1]
	}

	public lastOfType(tagName: string): TagInstance {
		return [...this.tags].reverse().find((tag) => tag.data.name === tagName);
	}

	public log(): string {
		return this.tags.map((t) => t.data.name).join(', ');
	}
}

export default OpenTags;
