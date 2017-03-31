import {IPreviousNodes} from "../types";

export default class PreviousNodes implements IPreviousNodes {
	private nodes = [];
	public add(node) {
		if (this.nodes.length === 3) {
			this.nodes = this.nodes.slice(1).concat(node);
		} else {
			this.nodes = this.nodes.concat(node);
		}
	}

	public last() {
		return this.nodes[this.nodes.length - 1];
	}

	public lastButOne() {
		return this.nodes[this.nodes.length - 2];
	}
	public lastButTwo() {
		return this.nodes[this.nodes.length - 3];
	}
}