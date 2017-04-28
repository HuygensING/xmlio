import {Tag as SaxTag} from "sax";
import {IState} from "./types";
import {compareNodeToSelector, ignoreNode} from "./utils";

export default (state: IState) => (node: SaxTag) => {
	const { getComponent, parent, ignore } = state.settings;

	if (
		parent != null &&
		compareNodeToSelector(node)(parent)
	) {
		state.writeToOutput = true;
	}

	let Comp;
	if (getComponent != null) Comp = getComponent(node);
	if (Comp == null) Comp = state.GenericTag;
	const tag = new Comp(node, state);
	const open = tag.open();

	if (
		!ignoreNode(state.settings.ignore, node) &&
		!state.openTags.containsOneOf(state.settings.ignore)
	) {
		state.appendHtml(open);
	}

	state.openTags.add(tag);
	state.previousNodes.add(node);
}
