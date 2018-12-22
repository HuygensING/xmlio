import puppeteer from 'puppeteer'
import evaluator from './evaluator'
import BaseXmlio from './index.base'
import handlerDefaults from './handler.defaults';

function logWarning(warning: string) {
	console.log(`[WARNING] ${warning}`)
}

export default class Xmlio extends BaseXmlio {
	async export(options: DataExporter): Promise<DataNode | DataNode[]>
	async export(options: TextExporter): Promise<string | string[]>
	async export(options: XmlExporter): Promise<string | string[]>
	async export(options: [DataExporter, XmlExporter]): Promise<[DataNode | DataNode[], string | string[]]>
	async export(options: Exporter[]): Promise<ExporterReturnValue[]>
	async export(): Promise<string | string[]>
	async export(options?: Exporter | Exporter[]): Promise<ExporterReturnValue | ExporterReturnValue[]> {
		if (options == null) options = handlerDefaults.xml
		else if (Array.isArray(options)) options = options.map(option => ({...handlerDefaults[option.type], ...option}))
		else options = {...handlerDefaults[options.type], ...options}

		const browser = await puppeteer.launch({
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox'
			]
		})

		const page = await browser.newPage()
		page.on('console', (msg: any) => {
			msg = msg.text()
			if (msg.slice(0, 7) === 'WARNING') logWarning(msg.slice(7))
			else console.log('From page: ', msg)
		})

		const output: string = await page.evaluate(
			evaluator,
			this.xml,
			this.transformers,
			this.parserOptions,
			options
		)

		browser.close()

		return output
	}
}