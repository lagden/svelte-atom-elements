<svelte:options accessors={true} />

<script>
	import {afterUpdate, createEventDispatcher} from 'svelte'

	// Props
	export let group = undefined
	export let value = undefined
	export let outline = false
	export let custom = false
	export let toggleMode = false

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

<input
	type="radio"
	class="_atom_frm__radio {className}"
	class:_atom_frm__radio___toggle={toggleMode}
	class:_atom_frm__radio___outline={outline}
	class:_atom_frm__radio___custom={custom}
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
