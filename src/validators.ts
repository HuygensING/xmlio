type Validators = { [K in TransformerType]: (props: XMLioTransformer) => boolean }

const validators: Validators = {
	change: function(props: ChangeTransformer)  {
		return props.changeFunc.length > 0 && props.selector.length > 0
	},
	exclude: function(props: ExcludeTransformer) {
		return props.selector.length > 0
	},
	rename: function(props: RenameTransformer) {
		return props.selector.length > 0 && props.newName.length > 0
	},
	replace: function(props: ReplaceTransformer) {
		return props.targetSelector.length > 0 && props.sourceSelectorFunc.length > 0
	},
	select: function(props: SelectTransformer) {
		return props.selector.length > 0
	}

}

export default validators