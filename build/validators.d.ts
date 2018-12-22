declare type Validators = {
    [K in TransformerType]: (props: XMLioTransformer) => boolean;
};
declare const validators: Validators;
export default validators;
