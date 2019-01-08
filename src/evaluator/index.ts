// import { exclude, replace, select, change, rename } from './transformers'
// import { wrapXml, unwrap, createProxyName, renameElement, replaceElement } from './utils'
// import { exportAsData, exportAsXml, exportAsText } from './exporters'


// export default function evaluator(
// 	trees: Element[],
// 	transformers: XMLioTransformer[],
// 	parserOptions: DomParserOptions,
// 	exporterOptions: Exporter | Exporter[]
// ): ExporterReturnValue | ExporterReturnValue[] {
// 	const proxyElements: Map<Element, Element> = new Map()
// 	const proxyAttributeElements: Element[] = []

// 	// Apply the transforms
// 	transformers.forEach((transformer: XMLioTransformer) => {
// 		if (transformer.type === 'exclude') trees = exclude(trees, transformer)
// 		if (transformer.type === 'replace') trees = replace(trees, transformer)
// 		if (transformer.type === 'select') trees = select(trees, transformer, parserOptions)
// 		if (transformer.type === 'change') trees = change(trees, transformer)
// 		if (transformer.type === 'rename') trees = rename(trees, transformer)
// 	})	

// 	function createOutput(exporter: Exporter): any[] {
// 		const output: any[] = trees
// 			.map(removeProxies)
// 			.map(unwrap)
// 			.map(tree => {
// 				if (exporter.type === 'xml') return exportAsXml(tree, exporter, parserOptions)
// 				if (exporter.type === 'data') return exportAsData(tree, exporter)
// 				if (exporter.type === 'text') return exportAsText(tree, exporter)
// 			})

// 		if (!output.length) return null
// 		if (output.length === 1) return output[0]
// 		return output
// 	}

// 	// Export the trees as configured by the user
// 	const output = Array.isArray(exporterOptions) ?
// 		exporterOptions.map(createOutput) :
// 		createOutput(exporterOptions)

// 	return Array.isArray(output) && output.length === 1 ?
// 		output[0] :
// 		output
// }
