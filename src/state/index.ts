import OpenTags from './open-tags';
import PreviousNodes from './previous-nodes';

class State {
	html = '';
	openTags = new OpenTags();
	previousNodes = new PreviousNodes();

	appendHtml(str) {
		this.html += str;
	}
}

export default State;
