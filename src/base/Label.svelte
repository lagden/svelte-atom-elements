<svelte:options accessors={true} />

<script>
	// Props
	export let disabled = false
	export let required = false
	export let toggleMode = false
	export let boldMode = false

	let _for = $$restProps?.for

	// CSS
	let className = ''
	export {className as class}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label
	class="_atom_frm__label {className}"
	class:_atom_frm__label___disabled={disabled}
	class:_atom_frm__label___required={required}
	class:_atom_frm__label___toggle={toggleMode}
	class:_atom_frm__label___bold={boldMode}
	{...(_for ? {for: _for} : {})}
	{...$$restProps}
><slot /></label>
