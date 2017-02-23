import BaseTag from './base-tag';

export default (state, tags, tagsToSkip) => (node) => {
	const Tag = Object.keys(tags).indexOf(node.name) > -1 ? tags[node.name] : BaseTag;
	const tag = new Tag(node, state);
	const open = tag.open();

	if (
		tagsToSkip.indexOf(node.name) === -1 &&
		!state.openTags.containsOneOf(tagsToSkip)
	) {
		state.appendHtml(open);
	}

	state.openTags.add(tag);
	state.previousNodes.add(node);
}
