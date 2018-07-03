import BaseTag from "./base";
import { StringSettings } from "../state/setttings";

class StringTag extends BaseTag {
	public open() {
		return '';
	}

	public close() {
		return (this.data.hasOwnProperty('children') && this.data.children.some(child => typeof child === 'string')) ?
			(this.state.settings as StringSettings).join :
			''
	}
}

export default StringTag;
