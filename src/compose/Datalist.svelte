<script>
	import {onMount, tick} from 'svelte'

	import Label from '../base/Label.svelte'
	import Input from '../base/Input.svelte'

	function uuid() {
		if ('crypto' in globalThis && globalThis.crypto?.randomUUID) {
			return globalThis.crypto.randomUUID()
		}
		return Number(Math.random()).toString(26).slice(2)
	}

	export let name
	export let value = ''
	export let outline = true
	export let showError = true
	export let label = false
	export let options = []
	export let optionkey = 'value'
	export let optionValue = 'text'
	export let id = `${name}_${uuid()}`
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
		{name}
		{list}
		{...(id ? {id} : {})}
		{...$$restProps}
	/>
	<datalist id={list}>
		{#if Array.isArray(options) && options.length > 0}
			{#each options as item (item[optionkey])}
				<option value={item[optionValue]} />
			{/each}
		{/if}
	</datalist>
	{#if showError}
		<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
	{/if}
</div>
