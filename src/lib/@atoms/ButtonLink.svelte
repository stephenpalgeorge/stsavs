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

<a class={buttonStyle} href={url} rel={external ? 'external' : null}>{label}</a>
