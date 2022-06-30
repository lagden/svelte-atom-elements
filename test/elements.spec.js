/* globals describe, afterEach, beforeAll, afterAll, test, expect */

import timekeeper from 'timekeeper'
import {cleanup, render} from '@testing-library/svelte'
import {
	// Base
	Checkbox,
	Input,
	Label,
	Select,
	// Compose
	Check,
	CheckGroup,
	Combo,
	Datalist,
	Radio,
	Read,
	Request,
	Text,
} from '../src/elements.js'

import SlotLabel from './SlotLabel.svelte'

beforeAll(() => {
	// Para o tempo
	timekeeper.freeze(1_604_416_038 * 1000)
})

afterAll(() => {
	timekeeper.reset()
})

const options = [
	{value: 1, text: 'Lagden'},
	{value: 2, text: 'Takamoto'},
	{value: 3, text: 'Tadashi'},
	{value: 4, text: 'Rita'},
	{value: 5, text: 'Jorge'},
]

describe('Checkbox', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Checkbox)
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Checkbox, {
			props: {
				checked: true,
				switchMode: true,
				class: 'customCss',
				required: true,
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Input', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Input)
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Input, {
			props: {
				value: 'foo',
				class: 'customCss',
				type: 'tel',
				required: true,
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('invalid type', () => {
		const {container} = render(Input, {
			props: {
				type: 'xxx',
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Label', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Label, {
			props: {
				for: 'inputID',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Label, {
			props: {
				class: 'customCss',
				for: 'inputID',
				required: true,
				disabled: false,
				'data-test': 1,
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot with slot', () => {
		const {container} = render(SlotLabel)
		expect(container).toMatchSnapshot()
	})
})

describe('Select', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Select)
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Select, {
			props: {
				value: 2,
				options,
				first: 'Selecione',
				first_disabled: false,
				class: 'customCss',
				required: true,
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Check', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Check, {
			props: {
				name: 'test',
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Check, {
			props: {
				name: 'test',
				class: 'customCss',
				checked: true,
				showError: false,
				label: 'Do you agree with the terms?',
				labelCheck: 'agree',
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('CheckGroup', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(CheckGroup, {
			props: {
				name: 'test',
				id: 'test_choices',
				disabled: true,
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(CheckGroup, {
			props: {
				name: 'test',
				class: 'customCss',
				group: ['b', 'c'],
				options: [
					{value: 'a', text: 'a'},
					{value: 'b', text: 'b'},
					{value: 'c', text: 'c'},
				],
				showError: false,
				label: 'Choices:',
				id: 'test_choices',
				required: true,
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Combo', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Combo, {
			props: {
				name: 'test',
				outline: false,
				showError: false,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Combo, {
			props: {
				name: 'test',
				label: '<b>Test</b>',
				class: 'customCss',
				required: true,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Datalist', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Datalist, {
			props: {
				name: 'test',
				id: 'test',
				list: 'test_list',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Datalist, {
			props: {
				name: 'test',
				value: 'Rita',
				options,
				class: 'customCss',
				required: true,
				id: 'test',
				list: 'test_list',
				label: '<b>Test</b>',
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Radio', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Radio, {
			props: {
				name: 'test',
				showError: false,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Radio, {
			props: {
				options,
				group: 1,
				name: 'test',
				toggleMode: true,
				class: 'customCss',
				label: '<b>Test</b>',
				required: true,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Read', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Read, {
			props: {
				value: 1,
				outline: false,
				wipe: true,
				showHelper: false,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Read, {
			props: {
				name: 'test',
				class: 'customCss',
				label: '<b>Test</b>',
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Request', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Request, {
			props: {
				name: 'test',
				value: 1,
				outline: false,
				showError: false,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Request, {
			props: {
				name: 'test',
				class: 'customCss',
				label: '<b>Test</b>',
				type: 'tel',
				required: true,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})
})


describe('Text', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Text, {
			props: {
				name: 'test',
				value: 1,
				outline: false,
				showError: false,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Text, {
			props: {
				name: 'test',
				class: 'customCss',
				label: '<b>Test</b>',
				type: 'tel',
				required: true,
				id: 'test',
			},
		})
		expect(container).toMatchSnapshot()
	})
})
