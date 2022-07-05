<svelte:options accessors={true} />

<script>
	import {afterUpdate, createEventDispatcher} from 'svelte'

	// Props
	export let checked = undefined
	export let base = true
	export let outline = false
	export let switchMode = false

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
	type="checkbox"
	class={className}
	class:_atom_frm__checkbox={base}
	class:_atom_frm__checkbox___switch={switchMode}
	class:_atom_frm__checkbox___outline={outline}
	bind:this={node}
	bind:checked
	on:input
	on:blur
	on:focus
	on:click
	on:change
	on:invalid
	{...$$restProps}
>
