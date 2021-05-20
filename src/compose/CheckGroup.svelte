<script>
	import Label from '../base/Label.svelte'
	import CheckboxGroup from '../base/CheckboxGroup.svelte'

	export let name
	export let group = []
	export let options = []
	export let label = undefined
	export let id = undefined

	let className = ''
	export {className as class}

	id = id ?? `${name}_${Number(Math.random()).toString(26).slice(2)}`
</script>

<div class="{className}">
	{#if label}
		<span
			class="_atom_frm__label"
			id="{id}_label"
		>{@html label}</span>
	{/if}
	<div class="_atom_frm__checkbox_group" aria-labelledby="{id}_label">
		{#each options as {value, text, props = {}} (`${value}_${text}`)}
			<Label
				class="_atom_frm__label___checkbox"
				disabled={$$restProps.disabled}
				required={$$restProps.required}
			>
				<CheckboxGroup
					bind:group
					on:blur
					on:focus
					on:click
					on:change
					{name}
					{value}
					{...$$restProps}
				/>
				<span aria-label="{text}">{text}</span>
			</Label>
		{/each}
	</div>
</div>
