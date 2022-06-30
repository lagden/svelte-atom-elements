<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Input from '../base/Input.svelte'
	import Message from '../helper/Message.svelte'

	export let value = ''
	export let outline = true
	export let showError = true
	export let showHelper = false
	export let helper = ''
	export let css = ''
	export let label = false
	export let id = `_${uuid()}`

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
	<div class="_atom_frm__request">
		<div class="_atom_frm__request_target">
			<Input
				class="{styleInput} {css}"
				bind:this={component}
				bind:value
				on:blur
				on:focus
				on:change
				on:input
				on:invalid={onInvalid}
				on:valid={onValid}
				{...(id ? {id} : {})}
				{...$$restProps}
			/>
			<slot name="list" />
		</div>
		<slot name="trigger" />
	</div>
	<Message
		{showHelper}
		{showError}
		{validationMessage}
	><slot name="helper">{helper}</slot></Message>
</div>
