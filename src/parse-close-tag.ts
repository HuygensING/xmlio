import {IState} from "./types";
import {compareNodeToSelector, ignoreNode} from "./utils";

export default (state: IState) => (tagName: string) => {
	const { ignore, parent } = state.settings;
	const tag = state.openTags.remove();

	if (
		tag != null &&
		// Ignore tags to skip
		// state.settings.ignore.indexOf(tag.data.name) === -1 &&
		!ignoreNode(ignore, tag.data) &&
		// Ignore children of tags to skip
		!state.openTags.containsOneOf(ignore)
	) {
		const close = tag.close();
		state.appendHtml(close);

		if (
			parent != null &&
			compareNodeToSelector(tag.data)(parent)
		) {
			state.writeToOutput = false;
		}
	}

}
