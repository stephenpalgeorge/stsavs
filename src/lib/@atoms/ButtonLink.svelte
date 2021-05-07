<script>
  export let label = "";
  export let style = "";
  export let theme = "";
  export let url = "";

  let external = false;
  let buttonStyle = buttonStyleClass(theme, style);

  function buttonStyleClass(theme, style) {
    let variation = style.replace("_", "-");
    return theme + "-theme--" + variation;
  }

  if (/https:\/\//.test(url)) external = true;
</script>

<style lang="scss">
  @use '../scss/variables' as var;

  a {
    position: relative;
    display: inline-block;
    font-family: var.$font-family--serif;
    font-weight: 900;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      &::after, &::before {
        top: 0;
        left: 0;
        right: 0;
      }
    }

    &::after,
    &::before {
      position: absolute;
      z-index: -1;
      content: "";
      top: -0.6rem;
      left: -0.6rem;
      width: 100%;
      height: 100%;
      background-color: var.$color-light--fade;
  
      transition: top 0.4s ease, left 0.4s ease, right 0.4s ease;
    }

    &::after {
      top: 0.6rem;
      left: initial;
      right: -0.6rem;
    }
  
    &[class*="purple-theme"] {
      background-color: var.$color-main;
    }

    &[class*="red-theme"] {
      background-color: var.$color-secondary;
    }
    
    &[class*="outline"] {
      padding: 0.75rem 1rem;
      color: var.$color-light;
      border: 0.25rem solid var.$color-light;
    }
    
    &[class*="outline-highlight"][class*="purple"] {
      border-color: var.$color-main--accent;
      color: var.$color-main--accent;
    }
    
    &[class*="outline-highlight"][class*="purple"]::after,
    &[class*="outline-highlight"][class*="purple"]::before {
      background-color: var.$color-main--accent--fade;
    }
    
    &[class*="outline-highlight"][class*="red"] {
      border-color: var.$color-secondary--accent;
      color: var.$color-secondary--accent;
    }
    
    &[class*="outline-highlight"][class*="red"]::after,
    &[class*="outline-highlight"][class*="red"]::before {
      background-color: var.$color-secondary--accent--fade;
    }
  }
</style>

<a
  class={buttonStyle}
  href={url}
  rel={external ? 'external' : null}
  target={external ? '_blank' : '_self'}>
  {label}
</a>
