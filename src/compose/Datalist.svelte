<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Input from '../base/Input.svelte'
	import Message from '../helper/Message.svelte'

	export let options = []
	export let optionKey = 'value'
	export let optionValue = 'text'
	export let value = ''
	export let outline = true
	export let showError = true
	export let showHelper = false
	export let helper = ''
	export let css = ''
	export let label = false
	export let id = `_${uuid()}`
	export let list = `list_${uuid()}`

	let className = ''
	export {className as class}

	// Estilo do formulário
	const styleInput = outline ? '_atom_frm__outline' : '_atom_frm__standard'

	// Bind HTML Element
	export let component = undefined

	// Validação via API do navegador
	let validationMessage = ''

	function onInvalid() {
		validationMessage = this?.validationMessage ?? ''
	}

	function onValid() {
		validationMessage = ''
	}
</script>

<div class="{className}">
	{#if label}
		<Label
			{...(id ? {for: id} : {})}
			disabled={$$restProps.disabled}
			required={$$restProps.required}
			boldMode={$$restProps?.boldMode ?? false}
		>{@html label}</Label>
	{/if}
	<Input
		class="{styleInput} {css}"
		bind:this={component}
		bind:value
		on:blur
		on:focus
		on:change
		on:input
		{list}
		{...(id ? {id} : {})}
		{...$$restProps}
	/>
	<datalist id={list}>
		{#if Array.isArray(options) && options.length > 0}
			{#each options as item (item[optionKey])}
				<option value={item[optionValue]} />
			{/each}
		{/if}
	</datalist>
	<Message
		{showHelper}
		{showError}
		{validationMessage}
	><slot name="helper">{helper}</slot></Message>
</div>
