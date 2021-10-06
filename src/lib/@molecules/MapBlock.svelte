<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import snarkdown from 'snarkdown';
  import BlockHeader from '$atoms/BlockHeader.svelte';

  export let id = "";
  export let title = "";
  export let description = "";
  export let lat = 51.420740;
  export let lon = -0.419330;
  export let zoom = 14;
  
  onMount(async () => {
    if (browser) {
      const L = await import('leaflet');
      // create the map.
      const map = L.map('map', { scrollWheelZoom: false, draggable: true }).setView([lat, lon], zoom);
      // render the tiles.
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      // add the marker.
      L.marker([lat, lon]).addTo(map);
      // remove the map when the component is destroyed.
      return () => {
        map.off();
        map.remove();
      }
    }
  });
</script>

<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;
  @import 'leaflet/dist/leaflet.css';

  .map-block {
    position: relative;
    padding: var.$vertical-flow 0;
    border-top: 1px solid var.$color-dark--fade;
    border-bottom: 1px solid var.$color-dark--fade;

    .mask {
      @include m.layout-mask;
      &::after, &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        transform: translate(-40%, -25%);
        @include m.shapes-circle(14rem);
        background-color: var.$color-main--fade;

        @include m.layout-break(lg) {
          background-color: rgba(var.$color-main, .05);
        }
      }
      &::before {
        @include m.shapes-circle(10rem);
        transform: translate(-50%, 50%);
      }
    }
  }

  section #map {
    height: 300px;
    box-shadow: var.$shadow-base;
    border: .25rem solid var.$color-light;
  }

  .map-block > div:not(.mask) {
    @include m.layout-container;
    > * + * {
      margin-top: var.$vertical-flow * .5;
    }
  }
</style>

<section class="map-block" id="map-block--{id}">
  <div class="mask"></div>
  <div>
    <BlockHeader title={title} description={description} />
    <div id="map"></div>
  </div>
</section>