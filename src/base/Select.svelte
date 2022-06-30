<svelte:options accessors={true} />

<script>
	import {afterUpdate, createEventDispatcher} from 'svelte'

	// Props
	export let value = ''
	export let options = []
	export let first = false

	let disabled = true
	export {disabled as first_disabled}

	// CSS
	let className = ''
	export {className as class}

	// Bind HTML Element
	export let node = undefined

	const dispatch = createEventDispatcher()

	afterUpdate(() => {
		const valid = node.checkValidity()
		if (valid) {
			dispatch('valid')
		}
	})
</script>

<select
	class="_atom_frm__base _atom_frm__select {className}"
	bind:this={node}
	bind:value
	on:blur
	on:focus
	on:change
	on:invalid
	{...$$restProps}
>
	{#if first}
		<option value="" {disabled} selected>{first}</option>
	{/if}

	{#if Array.isArray(options) && options.length > 0}
		{#each options as {value, text, props = {}} (`_${value}_${text}`)}
			<option {value} {...props}>{text}</option>
		{/each}
	{/if}
</select>
