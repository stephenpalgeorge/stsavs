<script>
  // BANNERS
  import FrameBanner from '$banners/FrameBanner.svelte';
  import GalleryBanner from '$banners/GalleryBanner.svelte';
  import HeroBanner from '$banners/HeroBanner.svelte';
  import TextClipBanner from '$banners/TextClipBanner.svelte';
  // MEDIA
  import ImageRow from '$media/ImageRow.svelte';
  import PhotoGallery from '$media/PhotoGallery.svelte';
  import VideoBlock from '$media/VideoBlock.svelte';
  // ATOMIC DESIGN
  import CallToAction from '$molecules/CallToAction.svelte';
  import MapBlock from '$molecules/MapBlock.svelte';
  import SocialLinks from '$molecules/SocialLinks.svelte';
  import StoryBlock from '$molecules/StoryBlock.svelte';
  import TextBlock from '$molecules/TextBlock.svelte';
  import CardBlock from '$organisms/CardBlock.svelte';

  export let components = [];
</script>

{#if components.length > 0}
  {#each components as component}
    {#if component.__component === 'banners.frame-banner'}
      <FrameBanner
        id={component.id}
        title={component.title}
        buttons={component.buttons}
        image={component.media} />

    {:else if component.__component === 'banners.gallery-banner' }
      <GalleryBanner
        bannerId={component.banner._id}
        colorTheme={component.color_theme}
        id={component.id} />
    
    {:else if component.__component === 'banners.hero-banner'}
      <HeroBanner
        id={component.id}
        title={component.Title}
        image={component.image}
        imageBW={component.black_white}
        focalPoint={[component.focal_point_x + '%', component.focal_point_y + '%']}
        colorTheme={component.color_theme} />
    
    {:else if component.__component === 'molecules.call-to-action'}
      <CallToAction
        anchorId={component.anchor_id}
        id={component.id}
        action={component.action}
        body={component.body}
        colorTheme={component.color_theme}
        title={component.title} />
        
    {:else if component.__component === 'organisms.card-block'}
      <CardBlock
        anchorId={component.anchor_id}
        id={component.id}
        title={component.title}
        body={component.description}
        cards={component.cards} />
        
    {:else if component.__component === 'media.image-row'}
      <ImageRow
        anchorId={component.anchor_id}
        id={component.id}
        title={component.title}
        description={component.description}
        images={component.images}
        colorTheme={component.color_theme} />
        
    {:else if component.__component === 'molecules.map-block'}
      <MapBlock
        anchorId={component.anchor_id}
        id={component.id}
        title={component.title}
        description={component.body}
        lat={component.latitude}
        lon={component.longitude}
        zoom={component.zoom_level} />

    {:else if component.__component === 'media.photo-gallery'}
      <PhotoGallery 
        anchorId={component.anchor_id}
        id={component.id}
        title={component.title}
        description={component.description}
        images={component.images} />
        
    {:else if component.__component === 'molecules.text-block'}
      <TextBlock
        anchorId={component.anchor_id}
        id={component.id}
        actions={component.actions}
        body={component.body}
        colorTheme={component.color_theme}
        title={component.title}
        pretitle={component.pre_title}
        titleLevel={component.title_level} />
    
    {:else if component.__component === 'banners.text-clip-banner'}
      <TextClipBanner
        title={component.title}
        image={component.image}
        buttons={component.buttons} />
        
    {:else if component.__component === 'molecules.social-links'}
      <SocialLinks
        anchorId={component.anchor_id}
        id={component.id}
        title={component.title}
        titleLevel={component.title_level}
        links={component.Icons}
        colorTheme={component.color_theme}
        isSticky={component.sticky} />
        
    {:else if component.__component === 'molecules.story-block'}
      <StoryBlock
        anchorId={component.anchor_id}
        id={component.id}
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
         
    {:else if component.__component === 'media.video-block'}
      <VideoBlock
        anchorId={component.anchor_id}
        id={component.id}
        title={component.title}
        body={component.body}
        videoId={component.video_id} />
    {/if}
  {/each}
{/if}
