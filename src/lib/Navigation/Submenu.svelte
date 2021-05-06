<script>
  export let items;
</script>

<style>
  .submenu {
    margin-top: 2rem;
    padding: 1.5rem 0.5rem;
    list-style-type: none;
    position: absolute;
    top: 100%;
    left: 50%;
    width: 10rem;
    transform: translateX(-50%);
    background-color: var(--color-main--fade);
    border: 1px solid var(--color-main);
    box-shadow: var(--shadow-base);
  }

  li {
    display: flex;
    margin-left: 0;
    text-align: center;
  }

  .submenu li + li {
    margin-top: 0.5rem;
  }

  li a {
    width: 100%;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
    text-transform: initial;
    color: var(--color-dark);
    padding: 0.5rem;
    transition: background 0.2s ease;
  }

  li a:hover {
    text-decoration: underline;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>

<ul class="submenu">
  {#each items as item}
    <li>
      <a href={item.url}>{item.label}</a>
    </li>
  {/each}
</ul>
