export default (state, tagsToSkip) => (text) => {
	if (!state.openTags.containsOneOf(tagsToSkip)) {
		state.appendHtml(text);
	}
}
