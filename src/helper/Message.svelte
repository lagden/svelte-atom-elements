<script>
	export let showHelper
	export let showError
	export let validationMessage
</script>

{#if showError || showHelper}
	<div class="_atom_frm__message">
		{#if showError}
			<div class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</div>
		{/if}
		{#if showHelper}
			<div class="_atom_frm__helper___message">
				<slot />
			</div>
		{/if}
	</div>
{/if}
