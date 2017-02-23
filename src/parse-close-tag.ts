export default (state, tagsToSkip) => (tagName) => {
	const tag = state.openTags.remove();

	if (
		tag != null &&
		// Ignore tags to skip
		tagsToSkip.indexOf(tag.data.name) === -1 &&
		// Ignore children of tags to skip
		!state.openTags.containsOneOf(tagsToSkip)
	) {
		const close = tag.close()
		state.appendHtml(close);
	}
}
