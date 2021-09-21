<script>
  import CallToAction from '$molecules/CallToAction.svelte';
  import CardBlock from '$organisms/CardBlock.svelte';
  import GalleryBanner from '$molecules/GalleryBanner.svelte';
  import MapBlock from '$molecules/MapBlock.svelte';
  import SocialLinks from "$molecules/SocialLinks.svelte";
  import StoryBlock from '$molecules/StoryBlock.svelte';
  import TextBlock from "$molecules/TextBlock.svelte";
  import VideoBlock from '$molecules/VideoBlock.svelte';

  export let components = [];
</script>

{#if components.length > 0}
  {#each components as component}
    {#if component.__component === 'molecules.gallery-banner' }
      <GalleryBanner bannerId={component.banner._id} colorTheme={component.color_theme} />

    {:else if component.__component === 'molecules.call-to-action'}
      <CallToAction
        action={component.action}
        body={component.body}
        colorTheme={component.color_theme}
        title={component.title} />

    {:else if component.__component === 'organisms.card-block'}
      <CardBlock
        title={component.title}
        body={component.description}
        cards={component.cards} />

    {:else if component.__component === 'molecules.map-block'}
      <MapBlock
        title={component.title}
        description={component.body}
        lat={component.latitude}
        lon={component.longitude}
        zoom={component.zoom_level} />

    {:else if component.__component === 'molecules.text-block'}
      <TextBlock
        actions={component.actions}
        body={component.body}
        colorTheme={component.color_theme}
        title={component.title}
        pretitle={component.pre_title}
        titleLevel={component.title_level} />

    {:else if component.__component === 'molecules.social-links'}
      <SocialLinks
        title={component.title}
        titleLevel={component.title_level}
        links={component.Icons}
        colorTheme={component.color_theme} />

    {:else if component.__component === 'molecules.story-block'}
      <StoryBlock
        title={component.title}
        titleLevel={component.title_level}
        quoteText={component.quote_text}
        quoteSource={component.quote_source}
        body={component.body}
        buttons={component.buttons}
        image={component.image[0]}
        imagePos={component.image_position}
        imageFilter={component.use_filter}
        filterPos={[component.filter_position_x + '%', component.filter_position_y + '%']} />

    {:else if component.__component === 'molecules.video-block'}
      <VideoBlock
        title={component.title}
        body={component.body}
        videoId={component.video_id} />
    {/if}
  {/each}
{/if}
