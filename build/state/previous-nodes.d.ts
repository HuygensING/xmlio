import { IPreviousNodes } from "../types";
export default class PreviousNodes implements IPreviousNodes {
    private nodes;
    add(node: any): void;
    last(): any;
    lastButOne(): any;
    lastButTwo(): any;
}
