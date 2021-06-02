<script>
	import {onMount, tick} from 'svelte'

	import Label from '../base/Label.svelte'
	import Input from '../base/Input.svelte'

	export let name
	export let value = ''
	export let outline = true
	export let showError = true
	export let label = false

	let className = ''
	export {className as class}

	// ID used for label
	$$restProps.id = $$restProps?.id ?? `${name}_${Number(Math.random()).toString(26).slice(2)}`

	// Class - CSS
	const styleInput = outline ? '_atom_frm__outline' : '_atom_frm__standard'

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
			for="{$$restProps.id}"
			disabled={$$restProps.disabled}
			required={$$restProps.required}
		>{@html label}</Label>
	{/if}
	<Input
		class="{styleInput}"
		bind:this={component}
		bind:value
		on:input
		on:blur
		on:focus
		on:click
		on:change
		{name}
		{...$$restProps}
	/>
	{#if showError}
		<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
	{/if}
</div>
