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
			<small class="_atom_frm__error___message" title={validationMessage}>{validationMessage}</small>
		{/if}
		{#if showHelper}
			<small class="_atom_frm__helper___message" title={helper}>
				<slot />
			</small>
		{/if}
	</div>
{/if}
