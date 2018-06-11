export const defaultProcessed = `<xml><locations><location xml:id="14">Aurora</location><location xml:id="15"><name>Buenos "Bono" Aires</name><size>12.000.000</size></location></locations></xml>`

export const xmlForReplaceNodes =
	`<xml>
		<pos on="14" />
		<locations>
			<location xml:id="14">Aurora</location>
			<location xml:id="15">
				<name>Buenos "Bono" Aires</name>
				<size>12.000.000</size>
			</location>
		</locations>
		<pos on="15" />
	</xml>`

export default 
	`<xml>
		<locations>
			<location xml:id="14">Aurora</location>
			<location xml:id="15">
				<name>Buenos "Bono" Aires</name>
				<size>12.000.000</size>
			</location>
		</locations>
	</xml>`