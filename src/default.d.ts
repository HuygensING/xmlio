declare interface DomParserOptions {
	handleNamespaces?: boolean
	namespaces?: string[]
}

declare interface DataNode {
	name: string
	attributes: { [key: string]: string }
	children: DataNode[]
}

declare type ExporterReturnValue = DataNode | DataNode[] | string | string[] | XMLDocument | XMLDocument[]