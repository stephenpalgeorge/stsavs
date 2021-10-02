<script>
  import { base } from "$lib/config.js";
  import Accordion from './Accordion.svelte';
  import {
    activeNavItem,
    menuPaneOpen,
    selectedDropdown,
  } from "../../stores/navigation.store.js";
  export let menu;

  function controlMenuPane(e, target = null) {
    e.preventDefault();
    if (target === null) $menuPaneOpen = !$menuPaneOpen;
    else $menuPaneOpen = target;
  }

  function handleMenuItem(e, item) {
    $activeNavItem = item.label;
    $selectedDropdown = null;
    controlMenuPane(e, false);
  }
</script>

<style lang="scss">
  @use '../scss/animations' as animate;
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  nav {
    position: fixed;
    top: 0;
    // we have to set a silly number here because `leaflet` sets
    // `z-index: 1000` on some of the elements :( ...
    z-index: 1001;
    width: 100%;
    height: var.$nav-height;
    background-color: var.$color-light;
    border-bottom: 1px solid var.$color-dark;
    box-shadow: var.$shadow-base;

    .menu-icon {
      position: relative;
      width: 2rem;
      height: 2rem;

      > div {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: .4rem;
        transform: translateY(-50%);
        background-color: var.$color-main;
        border-radius: .125rem;
        &:first-child {
          top: 0;
          transform: none;
        }

        &:last-child {
          top: unset;
          bottom: 0;
          transform: none;
        }
      }

    }
  }

  .contents {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 60rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include m.layout-break(sm) {
      padding: 0 var.$horizontal-flow * .5;
    }

    img {
      @include m.shapes-circle($size: 4.5rem);

      margin-top: var.$nav-height / 2;
      background-color: var.$color-light;
      border: 0.125rem solid var.$color-light;
      box-shadow: var.$shadow-base;

      &:hover {
        animation: animate.$twist;
      }
    }
  }

  .menu-pane {
    %button-off-screen {
      opacity: 0;
      transform: translateY(-1rem);
    }

    position: fixed;
    top: 0;
    right: -100%;
    z-index: 2;
    width: 16rem;
    height: 100vh;
    max-width: 90%;
    padding: var.$vertical-flow * .5 var.$horizontal-flow * .5;

    background-color: var.$color-light;
    box-shadow: -.25rem 0 .75rem .25rem rgba(var.$color-dark, .32);

    transition: right .4s ease-out;
    @keyframes button-fade {
      from { @extend %button-off-screen; }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    &.open {
      right: 0;
      button {
        animation: button-fade .2s forwards;
        animation-delay: .4s;
      }
    }

    button {
      @extend %button-off-screen;
      width: 100%;
      padding-bottom: .75rem;
      background: none;
      font-family: var.$font-family--sans-serif;
      font-size: var.$font-size--lead;
      color: var.$color-main;
      text-align: left;
      border: none;
      border-bottom: 1px solid var.$color-main;
    }

    ul {
      margin-top: var.$vertical-flow;
      list-style-type: none;
      li {
        color: var.$color-secondary;
        font-family: var.$font-family--serif;
        font-size: var.$font-size--lead;
        > a {
          color: inherit;
        }
      }

      li:not(:first-of-type) {
        margin-top: var.$vertical-flow * .5;
      }
    }
  }
</style>

<nav>
  <div class="contents">
    {#if menu.logo}
      <a
        on:click={() => {
          $activeNavItem = null;
          $selectedDropdown = null;
        }}
        href="/">
        <img alt={menu.logo.alternativeText} src={base + menu.logo.url} />
      </a>
    {/if}

    <div class="menu-icon" on:click={controlMenuPane}>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div class="menu-pane" class:open={$menuPaneOpen}>
      <button on:click={e => controlMenuPane(e, false)}>close &#8594;</button>
      <ul>
        <li
          on:click={e => handleMenuItem(e, {url: '/', label: 'Home'})}
          class:active={$activeNavItem === 'Home'}
          class="nav-item">
          <a href="/">Home</a>
        </li>
        {#each menu.items as item}
          {#if item.__component === 'menu.menu-link'}
            <li
              on:click={e => handleMenuItem(e, item)}
              class:active={$activeNavItem === item.label}
              class="nav-item">
              <a href={item.url}>{item.label}</a>
            </li>
          {:else if item.__component === 'menu.menu-dropdown'}
            <Accordion id={item.id} label={item.label} children={item.children} />
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</nav>