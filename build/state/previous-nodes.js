"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PreviousNodes {
    constructor() {
        this.nodes = [];
    }
    add(node) {
        if (this.nodes.length === 3) {
            this.nodes = this.nodes.slice(1).concat(node);
        }
        else {
            this.nodes = this.nodes.concat(node);
        }
    }
    last() {
        return this.nodes[this.nodes.length - 1];
    }
    lastButOne() {
        return this.nodes[this.nodes.length - 2];
    }
    lastButTwo() {
        return this.nodes[this.nodes.length - 3];
    }
}
exports.default = PreviousNodes;
