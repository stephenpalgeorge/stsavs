<style lang="scss">
  @use '../scss/variables' as var;
  @use '../scss/mixins' as m;

  footer {
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
      <img src="/assets/images/st-savs-logo--white.png" />
      <div class="text-content">
        <h4>St Saviour's Sunbury</h4>
        <p>205 Vicarage Rd, Sunbury-on-Thames, TW16 7TP</p>
      </div>
    </div>
    <div class="social-icons-block">
      <ul class="social-icons">
        <li><a href="https://www.facebook.com/StSavioursSunbury"><img src="/assets/images/facebook-logo--white.png" /></a></li>
        <li><a href="https://www.instagram.com/stsaviourssunbury/"><img src="/assets/images/instagram-logo--white.png" /></a></li>
        <li><a href="https://twitter.com/StSavsSunbury"><img src="/assets/images/twitter-logo--white.png" /></a></li>
        <li><a href="https://www.youtube.com/c/StSavioursSunburyOnline"><img src="/assets/images/youtube-logo--white.png" /></a></li>
        <li><a href="https://soundcloud.com/stsaviours"><img src="/assets/images/soundcloud-logo--white.png" /></a></li>
      </ul>
    </div>
    <div class="additional-logos-block">
      <ul class="additional-logos">
        <li><a href="https://www.churchofengland.org/"><img src="/assets/images/cofe-logo--white.png" /></a></li>
      </ul>
    </div>
    <div class="charity-info-block">
      <p>Charity Number: 1130267 | <a href="">Diocese of London Profile</a></p>
      <p>
        Copyright St Saviour's Church - All rights reserved | 
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/safeguarding-policy">Safeguarding Policy</a>
      </p>
    </div>
  </div>
</footer>