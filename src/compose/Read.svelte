<svelte:options accessors={true} />

<script>
	import {uuid} from '@tadashi/common'

	import Label from '../base/Label.svelte'
	import Message from '../helper/Message.svelte'

	export let value = ''
	export let outline = true
	export let wipe = false
	export let showMessage = true
	export let showHelper = true
	export let helper = ''
	export let label = false
	export let id = `read_${uuid()}`

	let className = ''
	export {className as class}

	// Bind HTML Element
	export let node = undefined

	const validationMessage = ''
	const showError = false

	// Estilo do formulário
	let css = outline ? '_atom_frm__outline' : '_atom_frm__standard'
	css = wipe ? '_atom_frm__wipe' : css
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
		class="_atom_frm__base {css}"
		bind:this={node}
		on:click
		{...(id ? {id} : {})}
		{...$$restProps}
	>{value}</div>
	<Message
		{showMessage}
		{showError}
		{showHelper}
		{validationMessage}
		{helper}
	><slot name="helper">{helper}</slot></Message>
</div>
