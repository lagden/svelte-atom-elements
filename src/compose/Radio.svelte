<script>
	import {onMount, tick} from 'svelte'
	import {uuid} from '../helper.js'

	import Label from '../base/Label.svelte'

	export let group = undefined
	export let options = []
	export let outline = false
	export let showError = true
	export let showMessage = true
	export let showHelper = true
	export let helper = ''
	export let toggleMode = false
	export let label = undefined
	export let id = `_${uuid()}`

	let className = ''
	export {className as class}

	// Validação via API do navegador
	let validationMessage = ''
	let radios

	async function updateValidationMessage() {
		await tick()
		const radio = radios?.item(0)
		validationMessage = radio?.validationMessage ?? ''
	}

	$: options, group, updateValidationMessage()

	onMount(() => {
		radios = document.getElementsByName(name)
		for (const radio of radios) {
			radio.addEventListener('validationMessage', updateValidationMessage)
		}
		return () => {
			for (const radio of radios) {
				radio.removeEventListener('validationMessage', updateValidationMessage)
			}
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
	<div
		aria-labelledby="{id}_label"
		class="_atom_frm__group"
		class:_atom_frm__group___toggle={toggleMode}
		class:_atom_frm__radio___outline={outline}
	>
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<Label class="_atom_frm__label___radio" {toggleMode}>
				<input
					type="radio"
					class="_atom_frm__radio"
					class:_atom_frm__radio___toggle={toggleMode}
					class:_atom_frm__radio___outline={outline}
					bind:group={group}
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
	{#if showMessage && (showError || showHelper)}
		<div class="_atom_frm__message">
			{#if showError}
				<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
			{/if}
			{#if showHelper}
				<small class="_atom_frm__helper___message" title={helper}>{@html helper}</small>
			{/if}
		</div>
	{/if}
</div>
