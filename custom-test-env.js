import {TestEnvironment} from 'jest-environment-jsdom'
import {TextEncoder, TextDecoder} from 'node:util'

class CustomTestEnvironment extends TestEnvironment {
	async setup() {
		await super.setup()
		this.global.document.body.scrollIntoView = () => {}
		this.global.Element.prototype.scrollIntoView = () => {}
		if (typeof this.global.TextEncoder === 'undefined') {
			this.global.TextEncoder = TextEncoder
			this.global.TextDecoder = TextDecoder
		}
	}
}

export default CustomTestEnvironment
