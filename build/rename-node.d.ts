import { RenameConfig } from "./state/setttings";
import { TagNode } from "sax2tree";
declare const renameNode: (node: TagNode, config: RenameConfig[]) => TagNode;
export default renameNode;
