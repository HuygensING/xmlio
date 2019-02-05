import { selectElements, replaceElement } from './utils'
import { COLON_REPLACE } from './proxy-handler'

export function exclude(trees: Element[], data: ExcludeTransformer): Element[] {
	return trees.map(tree => {
		const selector = (Array.isArray(data.selector)) ? data.selector : [data.selector]

		selector.forEach(s => {
			selectElements(tree, s)
				.forEach(el => el.parentNode.removeChild(el))
		})

		return tree
	})
}

export function change(trees: Element[], data: ChangeTransformer): Element[] {
	return trees.map(tree => {
		// const changeFunc = unwrapStringFunction(data.changeFunc)
		const targets = selectElements(tree, data.selector)
		Array.from(targets).forEach(data.changeFunc)
		return tree
	})
}

export function replace(trees: Element[], data: ReplaceTransformer): Element[] {
	return trees.map(tree => replaceInTree(tree, data))
}
function replaceInTree(tree: Element, data: ReplaceTransformer) {
	// const sourceSelectorFunc = unwrapStringFunction(data.sourceSelectorFunc)

	// Retrieve the targets from the document
	const targets = selectElements(tree, data.targetSelector)
	if (!targets.length) console.log('WARNING', `No targets found for ${data.targetSelector}`)

	// Keep a list of used elements, otherwise a replaced target or moved source can be
	// replaced or moved again
	const used: Node[] = []

	Array.from(targets)
		.forEach(target => {
			// Add the target to the used elements
			used.push(target)

			// Retrieve the sources, but subtract the already used sources
			const sourceSelector = data.sourceSelectorFunc(target)
			let sources = []
			if (sourceSelector instanceof Node) {
				sources.push(sourceSelector)
			} else {
				const sourceElements = selectElements(tree, sourceSelector)
				sources = Array.from(sourceElements).filter(source => used.indexOf(source) === -1)
			}

			// Split the sources in the first source and the other sources. The first sources replaces
			// the target
			if (!sources.length) {
				const attrs = Array.from(target.attributes).reduce((prev, curr) => {
					if (curr.name.indexOf(COLON_REPLACE) > -1) return prev
					if (curr.name === 'class' && curr.value === '') return prev
					prev += `[${curr.name}=${curr.value}]`
					return prev
				}, '')
				console.log('WARNING', `No sources (${sourceSelector}) found for target: ${data.targetSelector}${attrs}`)
				return
			}
			let [firstSource, ...otherSources] = sources
			if (!data.removeSource) firstSource = firstSource.cloneNode(true) as Element
			used.push(firstSource)
			replaceElement(target, firstSource)

			// The other sources are inserted after the first source
			if (!otherSources.length) return
			otherSources
				.filter(source => used.indexOf(source) === -1)
				.forEach(source => {
					if (!data.removeSource) source = source.cloneNode(true) as Element
					used.push(source)
					firstSource.parentNode.insertBefore(source, firstSource.nextSibling) // Insert the next source after the first source
				})
		})

	return tree
}
