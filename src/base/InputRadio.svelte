<svelte:options accessors={true} />

<script>
	import {afterUpdate, createEventDispatcher} from 'svelte'

	// Props
	export let group = undefined
	export let value = undefined
	export let base = true
	export let outline = false
	export let toggleMode = false

	// Css
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

<input
	type="radio"
	class={className}
	class:_atom_frm__radio={base}
	class:_atom_frm__radio___toggle={toggleMode}
	class:_atom_frm__radio___outline={outline}
	bind:this={node}
	bind:group
	{value}
	on:blur
	on:focus
	on:click
	on:change
	on:invalid
	{...$$restProps}
>
