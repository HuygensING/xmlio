import {IState} from "./types";

export default (state: IState) => (text: string) => {
	if (!state.openTags.containsOneOf(state.settings.ignore)) {
		if (text.trim().length > 0) {
			text = state.settings.transformTextNode(text);
		}

		state.appendHtml(text);
	}
}
