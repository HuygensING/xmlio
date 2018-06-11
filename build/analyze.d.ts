import { SaxTag } from 'xml2tree';
export interface Stats {
    [key: string]: {
        count: number;
        attributes?: Stats;
        values?: Stats;
    };
}
export default function analyzeAll(nodes: SaxTag[]): Stats;
