/// <reference path="./default.d.ts" />
/// <reference path="./exporters.d.ts" />
/// <reference path="./actions.d.ts" />

import puppeteer from 'puppeteer'
import evaluator from './evaluator'

export function logWarning(warning: string) {
	console.log(`[WARNING] ${warning}`)
}

export default class Xmlio {
	private transforms: Transform[] = []

	constructor(private xml: string, private parserOptions?: DomParserOptions) {}

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

	change(selector: string, changeFunc: (target: HTMLElement) => HTMLElement): Xmlio {
		this.transforms.push({
			selector,
			changeFunc: changeFunc.toString(),
			type: 'change',
		})
		return this
	}

	rename(selector: string, newName: string): Xmlio {
		this.transforms.push({
			selector,
			newName,
			type: 'rename',
		})
		return this
	}

	exclude(selector: string | string[]): Xmlio {
		this.transforms.push({
			selector,
			type: 'exclude'
		})
		return this
	}

	replace(targetSelector: string, sourceSelectorFunc: (target: HTMLElement) => string, removeSource: boolean = true): Xmlio {
		this.transforms.push({
			removeSource,
			sourceSelectorFunc: sourceSelectorFunc.toString(),
			targetSelector,
			type: 'replace',
		})	
		return this
	}

	select(selector: string): Xmlio {
		this.transforms.push({
			selector,
			type: 'select',
		})
		return this
	}
}