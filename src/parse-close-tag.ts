import State from './state'
import {compareNodeToSelector, ignoreNode} from "./utils"

export default (state: State) => (tagName: string) => {
	const tag = state.openTags.remove();

	if (
		tag != null &&
		// Ignore tags to skip
		// state.settings.ignore.indexOf(tag.data.name) === -1 &&
		!ignoreNode(state.settings.ignore, tag.data) &&
		// Ignore children of tags to skip
		!state.openTags.containsOneOf(state.settings.ignore)
	) {
		const close = tag.close();
		state.appendHtml(close);

		if (
			state.settings.parent != null &&
			compareNodeToSelector(tag.data)(state.settings.parent)
		) {
			state.settings.writeToOutput = false;
		}

		if (
			state.settings.splitOn != null &&
			compareNodeToSelector(tag.data)(state.settings.splitOn)
		) {
			state.settings.writeToOutput = false;
		}
	}

}
