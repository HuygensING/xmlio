import State from "./state";
import Settings from './state/setttings';
export interface ReturnType {
    result: string | string[] | Object;
    state: State;
}
declare const _default: (xmlString: string, settings?: Partial<Settings>) => Promise<ReturnType>;
export default _default;
