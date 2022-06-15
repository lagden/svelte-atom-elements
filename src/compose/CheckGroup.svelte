<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Message from '../helper/Message.svelte'

	export let group = []
	export let options = []
	export let switchMode = false
	export let outline = false
	export let showMessage = true
	export let showHelper = true
	export let helper = ''
	export let label = undefined
	export let id = `_${uuid()}`

	let className = ''
	export {className as class}

	const validationMessage = ''
	const showError = false
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
		class="_atom_frm__group"
	>
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<Label class="_atom_frm__label___checkbox">
				<input
					type="checkbox"
					class="_atom_frm__checkbox"
					class:_atom_frm__checkbox___switch={switchMode}
					class:_atom_frm__checkbox___outline={outline}
					bind:group
					on:blur
					on:focus
					on:click
					on:change
					{value}
					{...$$restProps}
				>
				<span aria-label="{text}">{text}</span>
			</Label>
		{/each}
	</div>
	<Message
		{showMessage}
		{showError}
		{showHelper}
		{validationMessage}
		{helper}
	><slot name="helper">{@html helper}</slot></Message>
</div>
