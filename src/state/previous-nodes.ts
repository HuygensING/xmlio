import {Tag as SaxTag} from "sax";

export default class PreviousNodes {
	private nodes: SaxTag[] = [];

	public add(node: SaxTag) {
		if (this.nodes.length === 3) {
			this.nodes = this.nodes.slice(1).concat(node);
		} else {
			this.nodes = this.nodes.concat(node);
		}
	}

	public last(): SaxTag {
		return this.nodes[this.nodes.length - 1];
	}

	public lastButOne(): SaxTag {
		return this.nodes[this.nodes.length - 2];
	}
	public lastButTwo(): SaxTag {
		return this.nodes[this.nodes.length - 3];
	}
}