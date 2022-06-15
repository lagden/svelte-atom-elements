<svelte:options accessors={true} />

<script>
	import {onMount, tick} from 'svelte'
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Checkbox from '../base/Checkbox.svelte'
	import Message from '../helper/Message.svelte'

	export let checked = undefined
	export let showError = true
	export let showMessage = true
	export let showHelper = true
	export let helper = ''
	export let label = undefined
	export let labelCheck = undefined
	export let id = `_${uuid()}`

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
			class:_atom_frm__label___bold={$$restProps?.boldMode ?? false}
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
			{...$$restProps}
		/>
		{#if labelCheck}
			<span aria-label="{labelCheck}">{labelCheck}</span>
		{/if}
	</Label>
	<Message
		{showMessage}
		{showError}
		{showHelper}
		{validationMessage}
		{helper}
	><slot name="helper">{@html helper}</slot></Message>
</div>
