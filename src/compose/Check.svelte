<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Checkbox from '../base/Checkbox.svelte'
	import Message from '../helper/Message.svelte'

	export let checked = undefined
	export let showError = true
	export let showHelper = false
	export let helper = ''
	export let css = ''
	export let label = undefined
	export let labelCheck = undefined
	export let id = `_${uuid()}`

	let className = ''
	export {className as class}

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
			class="{css}"
			bind:this={component}
			bind:checked
			on:blur
			on:focus
			on:click
			on:change
			on:invalid={onInvalid}
			on:valid={onValid}
			{...$$restProps}
		/>
		{#if labelCheck}
			<span aria-label="{labelCheck}">{labelCheck}</span>
		{/if}
	</Label>
	<Message
		{showHelper}
		{showError}
		{validationMessage}
	><slot name="helper">{helper}</slot></Message>
</div>
