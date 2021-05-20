/* globals describe, afterEach, test, expect */

import {cleanup, render} from '@testing-library/svelte'
import {
	Checkbox,
	CheckboxGroup,
	Input,
	Label,
	Select,
	Check,
	CheckGroup,
	Combo,
	Text
} from '../src/elements.js'
import SlotLabel from './SlotLabel.svelte'

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
				required: true
			}
		})
		expect(container).toMatchSnapshot()
	})
})

describe('CheckboxGroup', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(CheckboxGroup)
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(CheckboxGroup, {
			props: {
				group: ['a', 'b', 'c'],
				switchMode: true,
				class: 'customCss',
				value: 'b'
			}
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
				required: true
			}
		})
		expect(container).toMatchSnapshot()
	})

	test('invalid type', () => {
		const {container} = render(Input, {
			props: {
				type: 'xxx'
			}
		})
		expect(container).toMatchSnapshot()
	})
})

describe('Label', () => {
	afterEach(cleanup)

	test('should match snapshot default', () => {
		const {container} = render(Label)
		expect(container).toMatchSnapshot()
	})

	test('should match snapshot props', () => {
		const {container} = render(Label, {
			props: {
				class: 'customCss',
				for: 'inputID',
				required: true,
				disabled: false,
				'data-test': 1
			}
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
				options: [
					{value: 1, text: 'Tadashi'},
					{value: 2, text: 'Takamoto'}
				],
				first: 'Selecione',
				class: 'customCss',
				required: true
			}
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
				id: 'test'
			}
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
				id: 'test'
			}
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
				id: 'test_choices'
			}
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
					{value: 'c', text: 'c'}
				],
				showError: false,
				label: 'Choices:',
				id: 'test_choices'
			}
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
				id: 'test'
			}
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
				id: 'test'
			}
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
				id: 'test'
			}
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
				id: 'test'
			}
		})
		expect(container).toMatchSnapshot()
	})
})
