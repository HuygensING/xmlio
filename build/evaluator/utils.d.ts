export declare function wrapTree(parserOptions: DomParserOptions): (el: Element) => Element;
export declare function unwrap(wrapper: HTMLElement): HTMLElement;
export declare function unwrapStringFunction(func: string): any;
export declare function selectElements(el: Element, selector: string): Element[];
export declare function renameElement(el: Element, newName: string): Element;
export declare function replaceElement(oldEl: Element, newEl: Node): void;
