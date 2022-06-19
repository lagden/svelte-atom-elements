<script>
	export let showMessage
	export let showError
	export let showHelper
	export let validationMessage
	export let helper
</script>

{#if showMessage && (showError || showHelper)}
	<div class="_atom_frm__message">
		{#if showError}
			<div class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</div>
		{/if}
		{#if showHelper}
			<div class="_atom_frm__helper___message" title={helper}>
				<slot />
			</div>
		{/if}
	</div>
{/if}
