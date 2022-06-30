<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Message from '../helper/Message.svelte'

	export let group = undefined
	export let options = []
	export let outline = false
	export let custom = false
	export let toggleMode = false
	export let showError = true
	export let showHelper = false
	export let helper = ''
	export let css = ''
	export let label = false
	export let id = `_${uuid()}`

	let className = ''
	export {className as class}

	// Validação via API do navegador
	let validationMessage = ''

	function onInvalid(event) {
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
		class="_atom_frm__group {css}"
		class:_atom_frm__group___toggle={toggleMode}
		class:_atom_frm__radio___outline={outline}
		class:_atom_frm__radio___custom={custom}
	>
		{#each options as {value, text, props = {}}, idx (`_${value}_${text}`)}
			<slot name="loop" data={{value, text, props, idx}} >
				<Label class="_atom_frm__label___radio"  for={`_${value}_${text}`} {toggleMode}>
					<input
						type="radio"
						class="_atom_frm__radio"
						class:_atom_frm__radio___toggle={toggleMode}
						class:_atom_frm__radio___outline={outline}
						class:_atom_frm__radio___custom={custom}
						bind:group
						on:blur
						on:focus
						on:click
						on:change
						on:invalid={onInvalid}
						on:valid={onValid}
						{value}
						{...$$restProps}
					>
					<span aria-label="{text}">{text}</span>
				</Label>
			</slot>
		{/each}
	</div>
	<Message
		{showHelper}
		{showError}
		{validationMessage}
	><slot name="helper">{helper}</slot></Message>
</div>
