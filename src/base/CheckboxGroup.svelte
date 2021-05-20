<script>
	// Props
	export let group = []
	export let switchMode = false

	// Props class
	let className = ''
	export {className as class}
</script>

<input
	type="checkbox"
	class="_atom_frm__checkbox {className}"
	class:_atom_frm__checkbox___switch={switchMode}
	bind:group
	on:blur
	on:focus
	on:click
	on:change
	{...$$restProps}
>
