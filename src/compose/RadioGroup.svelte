<script>
	import {onMount, tick} from 'svelte'

	import Label from './Base_Label.svelte'

	export let name
	export let group = []
	export let options = []
	export let showError = true
	export let toggle = false
	export let label = undefined
	export let id = undefined

	let className = ''
	export {className as class}

	id = id ?? `${name}_${Number(Math.random()).toString(26).slice(2)}`

	let validationMessage = ''
	let radios

	async function updateValidationMessage() {
		await tick()
		const radio = radios?.item(0)
		console.log('radioooo', radio)
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
			class="_atom_frm__label"
			id="{id}_label"
		>{@html label}</span>
	{/if}
	<div
			 aria-labelledby="{id}_label"
			 class="_atom_frm__group"
			 class:_atom_frm__group___toggle={toggle}
	>
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<Label
				class="_atom_frm__label___radio"
				disabled={$$restProps.disabled}
				required={$$restProps.required}
			>
				<input
					type="radio"
					class="_atom_frm__radio"
					bind:group
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
