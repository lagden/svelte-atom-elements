<script>
	import {onMount, tick} from 'svelte'

	import Label from '../base/Label.svelte'

	export let name
	export let group = undefined
	export let options = []
	export let showError = true
	export let toggleMode = false
	export let label = undefined

	let className = ''
	export {className as class}

	// ID used for label
	$$restProps.id = $$restProps?.id ?? `${name}_${Number(Math.random()).toString(26).slice(2)}`

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
			id="{$$restProps.id}_label"
			class="_atom_frm__label"
			class:_atom_frm__label___disabled={$$restProps?.disabled ?? false}
			class:_atom_frm__label___required={$$restProps?.required ?? false}
		>{@html label}</span>
	{/if}
	<div
		aria-labelledby="{$$restProps.id}_label"
		class="_atom_frm__group"
		class:_atom_frm__group___toggle={toggleMode}
	>
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<Label class="_atom_frm__label___radio" {toggleMode}>
				<input
					type="radio"
					class="_atom_frm__radio"
					class:_atom_frm__radio___toggle={toggleMode}
					bind:group={group}
					on:blur
					on:focus
					on:click
					on:change
					{name}
					{value}
					{...$$restProps}
				>
				<span aria-label="{text}">{text}</span>
			</Label>
		{/each}
	</div>
	{#if showError}
		<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
	{/if}
</div>
