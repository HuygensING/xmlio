import { COLON_REPLACE } from './proxy-handler';

// import { COLON_REPLACE } from '.'

const pseudos = [':empty', ':not(', ':first-child', ':last-child', ':nth-child(', ':nth-last-child', ':nth-of-type', ':first-of-type', ':last-of-type', ':only-child']

// To match the root node when querySelector(All) is used,
// a wrapper node is used, because querySelector(All) only
// searches children.
export function wrapXml(xml: string, parserOptions: DomParserOptions): string {
	const namespaces = parserOptions.namespaces.reduce((prev, ns) => {
		prev += ` xmlns:${ns}="http://example.com"`
		return prev
	}, '')
	return `<section${namespaces}>${xml}</section>`
}

// Same as wrapXml, but for a node tree. This is used after a
// select transform, wrapXml is used when the XML string is converted
// to a node tree. Don't seperate them, because they need to be in sync.
export function wrapTree(parserOptions: DomParserOptions) {
	return function(el: Element): Element {
		const wrapper = document.createElement('section')
		parserOptions.namespaces.forEach(ns => {
			el.setAttribute(`xmlns:${ns}`, 'http://example.com')
		})
		wrapper.appendChild(el)
		return wrapper
	}
}

// Remove the wrapper node from the tree (see: wrapXml() and wrapTree())
export function unwrap(wrapper: HTMLElement): HTMLElement {
	return wrapper.firstChild as HTMLElement
}

// The data holds a string representation of a function (because it needs to be serializable).
// The function is restored to a real function by using the Function constructor,
// but because the Function constructor only takes the function body, the function created
// by the Function constructor (outerFunc) returns the function that is needed (sourceSelectorFunc)
export function unwrapStringFunction(func: string) {
	const outerFunc = new Function(`return ${func}`)
	return outerFunc() // Return the inner function, because that is what the user passed
}

export function selectElements(el: Element, selector: string): Element[] {
	const colonIndex = selector.indexOf(':')

	if (
		colonIndex > 0 &&
		pseudos.every(pseudo => selector.slice(colonIndex, colonIndex + pseudo.length) !== pseudo)
	) {
		// Replace the colon and convert the whole selector to lower case.
		// For instance a selector "some:uiComp" is not found, but "some:uicomp" is,
		// even though the name of the node is <some:uiComp>
		selector = selector.replace(/:/usg, COLON_REPLACE).toLowerCase()
	}

	const elements = el.querySelectorAll(selector)
	return Array.from(elements)
}

export function renameElement(el: Element, newName: string): Element {
	// Create a new element, because old.nodeName is read only
	const newEl = document.createElement(newName)

	// Transfer attributes
	Array.from(el.attributes).forEach(attr => newEl.setAttribute(attr.name, el.getAttribute(attr.name)))
	newEl.className = el.className

	// Transfer children
	let nextNode = el.firstChild as Node
	while (nextNode) {
		newEl.appendChild(nextNode.cloneNode(true))
		nextNode = nextNode.nextSibling
	}

	return newEl
}

export function replaceElement(oldEl: Element, newEl: Node) {
	if (oldEl.parentElement == null) return
	oldEl.parentElement.replaceChild(newEl, oldEl)
}
