export interface ICustomTag {
}
export interface SaxTagSelector {
    name?: string;
    attributes?: {
        [key: string]: string;
    };
    notAttributes?: {
        [key: string]: string;
    };
}
