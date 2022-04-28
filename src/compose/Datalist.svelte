<script>
	import {onMount, tick} from 'svelte'
	import {uuid} from '../helper.js'

	import Label from '../base/Label.svelte'
	import Input from '../base/Input.svelte'

	export let value = ''
	export let outline = true
	export let showError = true
	export let showMessage = true
	export let showHelper = true
	export let helper = ''
	export let label = false
	export let options = []
	export let optionKey = 'value'
	export let optionValue = 'text'
	export let id = `_${uuid()}`
	export let list = `list_${uuid()}`

	let className = ''
	export {className as class}

	// Estilo do formulário
	const styleInput = outline ? '_atom_frm__outline' : '_atom_frm__standard'

	// Validação via API do navegador
	let component
	let validationMessage = ''

	async function updateValidationMessage() {
		await tick()
		validationMessage = component?.node?.validationMessage ?? ''
	}

	$: value, component, updateValidationMessage()

	onMount(() => {
		component?.node?.addEventListener('validationMessage', updateValidationMessage)
		return () => {
			component?.node?.removeEventListener('validationMessage', updateValidationMessage)
		}
	})
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
		class="{styleInput}"
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
	{#if showMessage && (showError || showHelper)}
		<div class="_atom_frm__message">
			{#if showError}
				<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
			{/if}
			{#if showHelper}
				<small class="_atom_frm__helper___message" title={helper}>{@html helper}</small>
			{/if}
		</div>
	{/if}
</div>
