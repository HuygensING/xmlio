export default (state) => (text) => {
	if (!state.openTags.containsOneOf(state.tagsToSkip)) {
		state.appendHtml(text);
	}
}
