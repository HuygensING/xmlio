import {Tag as SaxTag} from "sax"
import {compareNodeToSelector, ignoreNode} from "./utils"
import State from './state'
import { TagInstance, TagType } from "./state/setttings";
import { SPLIT_ON_DIVIDER } from './constants'

export default (state: State) => (node: SaxTag) => {
	if (
		state.settings.parent != null &&
		compareNodeToSelector(node)(state.settings.parent)
	) {
		state.settings.writeToOutput = true;
	}

	if (
		state.settings.splitOn != null &&
		compareNodeToSelector(node)(state.settings.splitOn)
	) {
		state.settings.writeToOutput = true;
		state.output += SPLIT_ON_DIVIDER
	}

	const Tag: TagType = state.settings.getComponent(node)
	const tag: TagInstance = new Tag(node, state)
	const open = tag.open()

	if (
		!ignoreNode(state.settings.ignore, node) &&
		!state.openTags.containsOneOf(state.settings.ignore)
	) {
		state.appendHtml(open);
	}

	state.openTags.add(tag);
	state.previousNodes.add(node);
}
