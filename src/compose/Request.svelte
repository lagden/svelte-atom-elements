<svelte:options accessors={true} />

<script>
	import {onMount, tick} from 'svelte'
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Input from '../base/Input.svelte'
	import Message from '../helper/Message.svelte'

	export let value = ''
	export let outline = true
	export let showError = true
	export let showMessage = true
	export let showHelper = true
	export let helper = ''
	export let label = false
	export let id = `_${uuid()}`

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
	<div class="_atom_frm__request">
		<div class="_atom_frm__request_target">
			<Input
				class="{styleInput}"
				bind:this={component}
				bind:value
				on:blur
				on:focus
				on:change
				on:input
				{...(id ? {id} : {})}
				{...$$restProps}
			/>
			<slot name="list" />
		</div>
		<slot name="trigger" />
	</div>
	<Message
		{showMessage}
		{showError}
		{showHelper}
		{validationMessage}
		{helper}
	><slot name="helper">{@html helper}</slot></Message>
</div>
