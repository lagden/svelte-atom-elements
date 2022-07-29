<svelte:options accessors={true} />

<script>
	import {afterUpdate, createEventDispatcher} from 'svelte'

	// Props
	export let value = undefined
	export let base = true
	export let isLoading = false

	// CSS
	let className = ''
	export {className as class}

	// Type
	$$restProps.type = $$restProps?.type ?? 'text'

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
	class="{className}"
	class:_atom_frm__base={base}
	class:_atom_frm__range={$$restProps?.type === 'range'}
	class:_atom_frm__loading={isLoading}
	bind:this={node}
	bind:value
	on:input
	on:blur
	on:focus
	on:click
	on:change
	on:invalid
	{...$$restProps}
>
