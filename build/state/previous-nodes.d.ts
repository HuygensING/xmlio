import { Tag as SaxTag } from "sax";
export default class PreviousNodes {
    private nodes;
    add(node: SaxTag): void;
    last(): SaxTag;
    lastButOne(): SaxTag;
    lastButTwo(): SaxTag;
}
