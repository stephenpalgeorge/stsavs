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
  @use '../scss/mixins' as m;
  @use '../scss/variables' as var;

  a {
    position: relative;
    display: inline-block;
    padding: .75rem 1rem;
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

    // @include m.btn-button-style;
  }
  @include m.btn-button-theme;
</style>

<a
  class={buttonStyle}
  href={url}
  rel={external ? 'external' : null}
  target={external ? '_blank' : '_self'}>
  {label}
</a>
