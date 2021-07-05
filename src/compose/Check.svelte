<script>
	import {onMount, tick} from 'svelte'

	import Label from '../base/Label.svelte'
	import Checkbox from '../base/Checkbox.svelte'

	export let name
	export let checked = undefined
	export let showError = true
	export let label = undefined
	export let labelCheck = undefined
	export let id = `${name}_${Number(Math.random()).toString(26).slice(2)}`

	let className = ''
	export {className as class}

	// Validação via API do navegador
	let component
	let validationMessage = ''

	async function updateValidationMessage() {
		await tick()
		validationMessage = component?.node?.validationMessage ?? ''
	}

	$: checked, component, updateValidationMessage()

	onMount(() => {
		component?.node?.addEventListener('validationMessage', updateValidationMessage)
		return () => {
			component?.node?.removeEventListener('validationMessage', updateValidationMessage)
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
		>{@html label}</span>
	{/if}
	<Label
		aria-labelledby="{id}_label"
		class="_atom_frm__label___checkbox"
	>
		<Checkbox
			bind:this={component}
			bind:checked
			on:blur
			on:focus
			on:click
			on:change
			{name}
			{...$$restProps}
		/>
		{#if labelCheck}
			<span aria-label="{labelCheck}">{labelCheck}</span>
		{/if}
	</Label>
	{#if showError}
		<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
	{/if}
</div>
