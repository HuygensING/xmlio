export default (state) => (tagName) => {
	const tag = state.openTags.remove();

	if (
		tag != null &&
		// Ignore tags to skip
		state.tagsToSkip.indexOf(tag.data.name) === -1 &&
		// Ignore children of tags to skip
		!state.openTags.containsOneOf(state.tagsToSkip)
	) {
		const close = tag.close()
		state.appendHtml(close);
	}

	if (state.startFromTag === tagName) state.writeToOutput = false;
}
