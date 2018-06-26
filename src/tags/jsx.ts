import {convertColon, formatTagName} from "../utils"
import BaseTag from "./base"
import { JsxSettings } from "../state/setttings"

class JsxTag extends BaseTag {
	public open() {
		const slash = this.data.isSelfClosing ? '/' : ''
		const className = (this.className != null) ?
			` className="${this.className}"` :
			''

		const props = (this.state.settings as JsxSettings).passProps ? ' {...props}' : ''

		return `<${this.name()}${className}${this.getAttributes()}${props}${slash}>${this.openAfter()}`
	}

	public close() {
		return this.data.isSelfClosing ? '' : `${this.closeBefore()}</${this.name()}>`
	}

	public name() {
		return formatTagName(this.data.name)
	}

	protected getAttributes() {
		const attrs = this.data.attributes
		const keys = Object.keys(attrs)

		return keys
			.map((key) => {
				const value = attrs[key]

				key = convertColon(key)
				if (key === 'key') key = 'xmlKey'
				else if (key === 'ref') key = 'xmlRef'

				return ` ${key}="${value}"`
			})
			.join('')
	}
}

export default JsxTag
