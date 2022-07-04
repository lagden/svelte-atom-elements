<svelte:options accessors={true} />

<script>
	// import slugify from '@sindresorhus/slugify'
	import {uuid} from '@tadashi/common'
	import {afterUpdate, createEventDispatcher} from 'svelte'

	import Label from '../base/Label.svelte'
	import Message from '../helper/Message.svelte'

	// remover quando ajustar o slugify
	const slugify = (...args) => { console.debug(args) }

	export let group = []
	export let options = []
	export let switchMode = false
	export let outline = false
	export let validate = false
	export let showError = true
	export let showHelper = true
	export let helper = ''
	export let css = ''
	export let label = false
	export let id = `_${uuid()}`

	let className = ''
	export {className as class}

	export let name
	name = `${name}[]`

	let wrapper
	let node

	// Validação via API do navegador
	let validationMessage = ''

	function _ignoreCleanup(node, value = true) {
		if (value === true) {
			node.dataset.ignoreCleanup = value
		} else {
			Reflect.deleteProperty(node.dataset, 'ignoreCleanup')
		}
		return node
	}

	function customValidate() {
		if (!wrapper) {
			return
		}

		const nodes = wrapper.querySelectorAll('input[type=checkbox]')
		const invalid = [...nodes].every(node => node.checked === false)
		for (const node of nodes) {
			_ignoreCleanup(node, invalid)
		}
		const msg = invalid ? 'Selecione pelo menos uma opção.' : ''
		node = nodes?.item(0)
		node?.setCustomValidity(msg)
		validationMessage = msg
	}

	const dispatch = createEventDispatcher()

	afterUpdate(() => {
		if (validate) {
			customValidate()

			if (node) {
				const valid = node?.checkValidity()
				if (valid) {
					dispatch('valid')
				}
			}
		}
	})
</script>

<div class="{className}">
	{#if label}
		<span
			id="{id}_label"
			class="_atom_frm__label"
			class:_atom_frm__label___disabled={$$restProps?.disabled ?? false}
			class:_atom_frm__label___required={$$restProps?.required ?? false}
			class:_atom_frm__label___bold={$$restProps?.boldMode ?? false}
		>{@html label}</span>
	{/if}
	<div
		bind:this={wrapper}
		aria-labelledby="{id}_label"
		class={css ?? '_atom_frm__group'}
	>
		{#each options as {value, text, props = {}}, idx (slugify(`_${value}_${text}`))}
			<slot name="loop" data={{value, text, props, idx}} >
				<Label class="_atom_frm__label___checkbox">
					<input
						type="checkbox"
						class="_atom_frm__checkbox"
						class:_atom_frm__checkbox___switch={switchMode}
						class:_atom_frm__checkbox___outline={outline}
						bind:group
						on:blur
						on:focus
						on:click
						on:change
						on:invalid
						{value}
						{name}
						{...$$restProps}
					>
					<span aria-label="{text}">{text}</span>
				</Label>
			</slot>
		{/each}
	</div>
	<Message
		{showHelper}
		{showError}
		{validationMessage}
	><slot name="helper">{helper}</slot></Message>
</div>
