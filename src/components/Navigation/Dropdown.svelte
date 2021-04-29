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
    if (label !== $activeNavItem) $activeNavItem = label;
    if (itemId === $selectedDropdown) $selectedDropdown = null;
    else $selectedDropdown = itemId;
  }
</script>

<style>
  li {
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-left: 3rem;
  }

  li span {
    color: #222;
    text-decoration: none;
    font-size: 0.875rem;
    padding: 0.5rem;
    transition: background 0.2s ease, color 0.2s ease;
  }

  li span:hover,
  li span:focus {
    cursor: pointer;
    background-color: rgba(76, 77, 98, 0.1);
    text-decoration: underline;
  }

  li.active span {
    background-color: rgba(76, 77, 98, 1);
    color: #fff;
    text-decoration: underline;
  }
</style>

<li class:active={$activeNavItem === label}>
  <span on:click={() => handleDropdown(id)}>{label}</span>
  {#if $selectedDropdown === id}
    <Submenu items={children} />
  {/if}
</li>
