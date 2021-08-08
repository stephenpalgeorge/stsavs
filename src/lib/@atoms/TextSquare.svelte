<script>
  export let color = "";
  export let text = "";
  export let link = "";
</script>

<div class="text-square">
  {#if link.length > 0}
    <a href={link}>
      <p>{text}</p>
    </a>
  {:else}
    <p>{text}</p>
  {/if}
</div>