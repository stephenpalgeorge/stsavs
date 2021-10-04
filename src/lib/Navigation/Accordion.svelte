<script>
  import { onMount } from 'svelte';
  import Submenu from './Submenu.svelte';
  import {
    activeNavItem,
    selectedDropdown,
    menuPaneOpen,
  } from '../../stores/navigation.store.js';

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

  onMount(() => {
    document.addEventListener('click', e => {
      if (!Array.from(e.target.classList).includes('nav-item') && !Array.from(e.target.classList).includes('nav-item--label')) {
        $activeNavItem = null;
        $selectedDropdown = null;
      }
    });
  });
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  li {
    &:not(:first-of-type) {
      margin-top: var.$vertical-flow * .75;
    }
    &:last-of-type {
      margin-bottom: var.$vertical-flow * .75;
    }

    &.active {
      font-weight: 900;
      > span {
        text-decoration: none;
      }
    }
    color: var.$color-secondary;
    font-family: var.$font-family--serif;
    font-size: var.$font-size--lead;
    > span {
      color: inherit;
      text-decoration: underline;
    }
  }
</style>

<li class:active={$activeNavItem === label} class="nav-item">
  <span class="nav-item--label" on:click={() => handleDropdown(id)}>{label}</span>
  {#if $selectedDropdown === id}
    <Submenu items={children} context="accordion" />
  {/if}
</li>