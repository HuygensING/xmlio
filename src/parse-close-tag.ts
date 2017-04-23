import {IState} from "./types";

export default (state: IState) => (tagName: string) => {
	const tag = state.openTags.remove();

	if (
		tag != null &&
		// Ignore tags to skip
		state.settings.tagsToSkip.indexOf(tag.data.name) === -1 &&
		// Ignore children of tags to skip
		!state.openTags.containsOneOf(state.settings.tagsToSkip)
	) {
		const close = tag.close()
		state.appendHtml(close);
	}

	if (state.settings.startFromTag === tagName) state.writeToOutput = false;
}
