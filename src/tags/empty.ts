import BaseTag from "./base";

class EmptyTag extends BaseTag {
	public open() {
		return ' ';
	}

	public close() {
		return ' ';
	}
}

export default EmptyTag;
