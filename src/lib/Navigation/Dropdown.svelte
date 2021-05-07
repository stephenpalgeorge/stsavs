<script>
  import Submenu from "./Submenu.svelte";
  import {
    activeNavItem,
    selectedDropdown
  } from "../../stores/navigation.store.js";
  export let id;
  export let label;
  export let children;

  function handleDropdown(itemId) {
    // handle active nav item
    if (label === $activeNavItem) $activeNavItem = null;
    else $activeNavItem = label;
    // handle dropdown toggle
    if (itemId === $selectedDropdown) $selectedDropdown = null;
    else $selectedDropdown = itemId;
  }
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  
  li {
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-family: var.$font-family--sans-serif;
    margin-left: 3rem;
  
    span {
      color: var.$color-dark;
      text-decoration: none;
      font-size: 0.875rem;
      padding: 0.5rem;
      transition: background 0.2s ease, color 0.2s ease;
      &:hover,
      &:focus {
        cursor: pointer;
        background-color: var.$color-main--fade;
        text-decoration: underline;
      }
    }
  
    &.active span {
      background-color: var.$color-main;
      color: var.$color-light;
      text-decoration: underline;
    }
  }
</style>

<li class:active={$activeNavItem === label}>
  <span on:click={() => handleDropdown(id)}>{label}</span>
  {#if $selectedDropdown === id}
    <Submenu items={children} />
  {/if}
</li>
