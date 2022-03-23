<svelte:options accessors={true} />

<script>
	// Props
	export let checked = undefined
	export let switchMode = false
	export let outline = false

	// CSS
	let className = ''
	export {className as class}

	// Bind HTML Element
	export let node = false
</script>

<input
	type="checkbox"
	class="_atom_frm__checkbox {className}"
	class:_atom_frm__checkbox___switch={switchMode}
	class:_atom_frm__checkbox___outline={outline}
	bind:this={node}
	bind:checked
	on:input
	on:blur
	on:focus
	on:click
	on:change
	{...$$restProps}
>
