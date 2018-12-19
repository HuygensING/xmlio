import puppeteer from 'puppeteer'
import evaluator from './evaluator'
import BaseXmlio from './index.base'

function logWarning(warning: string) {
	console.log(`[WARNING] ${warning}`)
}

export default class Xmlio extends BaseXmlio {
	async export(options: DataExporterOptions): Promise<DataNode | DataNode[]>
	async export(options: TextExporterOptions): Promise<string | string[]>
	async export(options: XmlExporterOptions): Promise<string | string[]>
	async export(options: [DataExporterOptions, XmlExporterOptions]): Promise<[DataNode | DataNode[], string | string[]]>
	async export(options: Options[]): Promise<ExporterReturnValue[]>
	async export(): Promise<string | string[]>
	async export(options?: Options | Options[]): Promise<ExporterReturnValue | ExporterReturnValue[]> {
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
			this.transforms,
			this.parserOptions,
			options
		)

		browser.close()

		return output
	}
}