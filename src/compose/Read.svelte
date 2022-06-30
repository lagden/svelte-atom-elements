<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Message from '../helper/Message.svelte'

	export let value = ''
	export let outline = true
	export let wipe = false
	export let showHelper = true
	export let helper = ''
	export let css = ''
	export let label = false
	export let id = `read_${uuid()}`

	let className = ''
	export {className as class}

	// Bind HTML Element
	export let node = undefined

	// Estilo do formulário
	let styleInput = outline ? '_atom_frm__outline' : '_atom_frm__standard'
	styleInput = wipe ? '_atom_frm__wipe' : styleInput
</script>

<div class="{className}">
	{#if label}
		<Label
			{...(id ? {for: id} : {})}
			disabled={$$restProps?.disabled ?? false}
			required={$$restProps?.required ?? false}
			boldMode={$$restProps?.boldMode ?? false}
		>{@html label}</Label>
	{/if}
	<div
		class="_atom_frm__base {styleInput} {css}"
		bind:this={node}
		on:click
		{...(id ? {id} : {})}
		{...$$restProps}
	>{value}</div>
	<Message
		{showHelper}
		showError={false}
		validationMessage=""
	><slot name="helper">{helper}</slot></Message>
</div>
