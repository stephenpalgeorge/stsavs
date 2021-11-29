<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  footer {
    margin-top: auto;
    background-color: var.$color-dark;

    > div {
      @include m.layout-container;
      display: flex;
      padding: var.$vertical-flow 0;
      flex-direction: column;

      > div + div {
        margin-top: var.$vertical-flow * .5;
      }
      .address-block {
        display: flex;
        align-items: center;
        img {
          width: 3.5rem;
          height: 3.5rem;
        }

        .text-content {
          margin-left: 1rem;
          * {
            font-family: var.$font-family--sans-serif;
            color: var.$color-light;
          }
        }
      }

      .social-icons-block,
      .additional-logos-block {
        ul {
          display: flex;
          list-style-type: none;

          > li + li {
            margin-left: 1rem;
          }

          li img {
            height: 2rem;
            width: auto;
          }
        }
      }

      .charity-info-block {
        * {
          color: var.$color-light;
        }

        a {
          transition: color .2s ease;
          &:hover {
            color: var.$color-secondary--accent;
          }
        }
      }
    }
  }
</style>

<footer>
  <div>
    <div class="address-block">
      <img src="/images/st-savs-logo--white.png" alt="The St Saviour's Sunbury church logo" />
      <div class="text-content">
        <h4>St Saviour's Sunbury</h4>
        <p>205 Vicarage Rd, Sunbury-on-Thames, TW16 7TP</p>
      </div>
    </div>
    <div class="social-icons-block">
      <ul class="social-icons">
        <li><a href="https://www.facebook.com/StSavioursSunbury"><img src="/images/facebook-logo--white.png" alt="A white Facebook logo" /></a></li>
        <li><a href="https://www.instagram.com/stsaviourssunbury/"><img src="/images/instagram-logo--white.png" alt="A white Instagram logo" /></a></li>
        <li><a href="https://twitter.com/StSavsSunbury"><img src="/images/twitter-logo--white.png" alt="A white Twitter logo" /></a></li>
        <li><a href="https://www.youtube.com/c/StSavioursSunburyOnline"><img src="/images/youtube-logo--white.png" alt="A white YouTube logo" /></a></li>
        <li><a href="https://soundcloud.com/stsaviours"><img src="/images/soundcloud-logo--white.png" alt="A white SoundClound logo" /></a></li>
      </ul>
    </div>
    <div class="additional-logos-block">
      <ul class="additional-logos">
        <li><a href="https://www.churchofengland.org/"><img src="/images/cofe-logo--white.png" alt="The Church of England logo, in white" /></a></li>
      </ul>
    </div>
    <div class="charity-info-block">
      <p>Charity Number: 1130267 | <a href="https://www.london.anglican.org/">Diocese of London Profile</a></p>
      <p>
        Copyright St Saviour's Church - All rights reserved | 
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/safeguarding-policy">Safeguarding Policy</a>
      </p>
    </div>
  </div>
</footer>