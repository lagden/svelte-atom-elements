<svelte:options accessors={true} />

<script>
	import Label from '../base/Label.svelte'
	import {uuid} from '../helper.js'

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
	{#if showMessage && showHelper}
		<div class="_atom_frm__message">
			{#if showHelper}
				<small class="_atom_frm__helper___message" title={helper}>{@html helper}</small>
			{/if}
		</div>
	{/if}
</div>
