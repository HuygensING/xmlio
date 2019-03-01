export declare function unwrap(wrapper: HTMLElement): HTMLElement;
export declare function unwrapStringFunction(func: string): any;
export declare function selectElements(doc: XMLDocument, selector: string): Element[];
export declare function renameElement(doc: XMLDocument, el: Element, newName: string): Element;
export declare function replaceElement(oldEl: Element, newEl: Node): void;
export declare function createProxyName(name: string): string;
export declare function revertProxyName(name: string): string;
export declare function getDepth(node: Node, parent: Node): number;
