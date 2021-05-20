<svelte:options accessors />

<script>
	export let value = ''
	export let options = []
	export let first = false

	// Bind HTML Element
	export let node = undefined

	let className = ''
	export {className as class}
</script>

<select
	class="_atom_frm__base _atom_frm__select {className}"
	bind:this={node}
	bind:value
	on:blur
	on:focus
	on:change
	{...$$restProps}
>
	{#if first}
		<option value="" disabled selected>{first}</option>
	{/if}

	{#if Array.isArray(options) && options.length > 0}
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<option {value} {...props}>{text}</option>
		{/each}
	{/if}
</select>
