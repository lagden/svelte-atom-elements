<svelte:options accessors={true} />

<script>
	// Props
	export let value = ''

	// CSS
	let className = ''
	export {className as class}

	// Bind HTML Element
	export let node = undefined

	// Mapa dos tipos permitidos
	const types = new Set([
		'date',
		'datetime-local',
		'email',
		'hidden',
		'month',
		'number',
		'password',
		'search',
		'tel',
		'text',
		'time',
		'url',
		'week',
	])
	$$restProps.type = $$restProps?.type ?? 'text'
	$$restProps.type = types.has($$restProps.type) ? $$restProps.type : 'text'
</script>

<input
	class="_atom_frm__base {className}"
	bind:this={node}
	bind:value
	on:input
	on:blur
	on:focus
	on:click
	on:change
	{...$$restProps}
>
