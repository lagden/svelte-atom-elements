<svelte:options accessors={true} />

<script>
	import slugify from '@sindresorhus/slugify'
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import InputRadio from '../base/InputRadio.svelte'
	import Message from '../helper/Message.svelte'

	export let group = undefined
	export let options = []
	export let toggleMode = false
	export let base = true
	export let useGroup = true
	export let outline = false
	export let showError = true
	export let showHelper = true
	export let helper = ''
	export let custom = ''
	export let label = undefined
	export let id = `_${uuid()}`

	export let name

	let className = ''
	export {className as class}

	// Validação via API do navegador
	export let validationMessage = ''

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
	<div
		aria-labelledby="{id}_label"
		class={custom}
		class:_atom_frm__group={useGroup}
		class:_atom_frm__radio___outline={outline}
		class:_atom_frm__group___toggle={toggleMode}
	>
		{#each options as {value, text, props = {}}, idx (slugify(`_${value}_${text}`))}
			<slot name="loop" data={{value, text, props, idx}} >
				<Label
					base={false}
					{toggleMode}
					class="_atom_frm__label___radio"
				>
					<InputRadio
						{base}
						{outline}
						{toggleMode}
						{value}
						{name}
						bind:group
						on:blur
						on:focus
						on:click
						on:change
						on:invalid={onInvalid}
						on:valid={onValid}
						{...$$restProps}
					/>
					<span aria-label="{text}">{text}</span>
				</Label>
			</slot>
		{/each}
	</div>
	<Message
		{showHelper}
		{showError}
		bind:validationMessage
	><slot name="helper">{helper}</slot></Message>
</div>
