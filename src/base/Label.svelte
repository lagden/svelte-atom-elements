<script>
	let className = ''
	export {className as class}
</script>

<label
	class="_atom_frm__label {className}"
	class:_atom_frm__label___disabled={$$restProps?.disabled ?? false}
	class:_atom_frm__label___required={$$restProps?.required ?? false}
	class:_atom_frm__label___toggle={$$restProps?.toggleMode ?? false}
	{...$$restProps}
><slot /></label>
