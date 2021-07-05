<script>
	// Props
	export let disabled = false
	export let required = false
	export let toggleMode = false

	// CSS
	let className = ''
	export {className as class}
</script>

<label
	class="_atom_frm__label {className}"
	class:_atom_frm__label___disabled={disabled}
	class:_atom_frm__label___required={required}
	class:_atom_frm__label___toggle={toggleMode}
	{...$$restProps}
><slot /></label>
