import BaseTag from "./base";
import {ICustomTag} from "../types";

class EmptyTag extends BaseTag implements ICustomTag {
	public open() {
		return ' ';
	}

	public close() {
		return ' ';
	}
}

export default EmptyTag;
