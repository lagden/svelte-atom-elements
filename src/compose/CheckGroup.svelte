<script>
	import Label from '../base/Label.svelte'

	export let name
	export let group = []
	export let options = []
	export let switchMode = false
	export let outline = false
	export let label = undefined
	export let id = `${name}_${Number(Math.random()).toString(26).slice(2)}`

	let className = ''
	export {className as class}
</script>

<div class="{className}">
	{#if label}
		<span
			id="{id}_label"
			class="_atom_frm__label"
			class:_atom_frm__label___disabled={$$restProps?.disabled ?? false}
			class:_atom_frm__label___required={$$restProps?.required ?? false}
		>{@html label}</span>
	{/if}
	<div
		aria-labelledby="{id}_label"
		class="_atom_frm__group"
	>
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<Label class="_atom_frm__label___checkbox">
				<input
					type="checkbox"
					class="_atom_frm__checkbox"
					class:_atom_frm__checkbox___switch={switchMode}
					class:_atom_frm__checkbox___outline={outline}
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
</div>
