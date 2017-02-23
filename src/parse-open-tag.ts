import BaseTag from './base-tag';

export default (state, tags, tagsToSkip) => (node) => {
	const Tag = Object.keys(tags).indexOf(name) > -1 ? tags[name] : BaseTag;
	const tag = new Tag(node, state);
	const open = tag.open();

	if (
		tagsToSkip.indexOf(name) === -1 &&
		!state.openTags.containsOneOf(tagsToSkip)
	) {
		state.appendHtml(open);
	}

	state.openTags.add(tag);
	state.previousNodes.add(node);
}
