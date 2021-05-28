<script>
	import {onMount, tick} from 'svelte'

	import Label from '../base/Label.svelte'
	import Checkbox from '../base/Checkbox.svelte'

	export let name
	export let checked = undefined
	export let showError = true
	export let label = undefined
	export let labelCheck = undefined

	let className = ''
	export {className as class}

	// ID used for label
	$$restProps.id = $$restProps?.id ?? `${name}_${Number(Math.random()).toString(26).slice(2)}`

	let component
	let validationMessage = ''

	async function updateValidationMessage() {
		await tick()
		validationMessage = component?.node?.validationMessage ?? ''
	}

	$: {
		checked
		component
		updateValidationMessage()
	}

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
			class="_atom_frm__label"
			id="{$$restProps.id}_label"
		>{@html label}</span>
	{/if}
	<Label
		class="_atom_frm__label___checkbox"
		for="{$$restProps.id}"
		disabled={$$restProps.disabled}
		required={$$restProps.required}
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
