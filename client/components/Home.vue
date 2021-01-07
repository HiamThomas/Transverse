<template>
  <div>
    <div class="block1">
    <header>
      <div class="block_button_menu">
      <router-link class="button_menu" data-aos="fade-right" to='/'>Accueil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Games</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="250" to='/register'>Inscription</router-link>
    </div>
    </header>
    <h1 class="titre_menu" data-aos="fade-up-right" data-aos-duration="2000">Find Player</h1>
    <div class="block_image">
      <div class="image1" data-aos="fade-right" data-aos-duration="1500"></div>
      <div class="image2" data-aos="fade-left" data-aos-duration="1500"></div>
      <div class="block_scroll">
        <a @click="fonction_scroll()" class="scroll_down" data-aos="fade-right" data-aos-delay="1900" data-aos-offset="-500" data-aos-duration="3000">Scroll Down</a>
        <span class="vertical-line" data-aos="fade-right" data-aos-anchor-placement="center-bottom" data-aos-delay="2200" data-aos-duration="3000"></span>
      </div>
    </div>
    </div>
    <div class="block_image2">
      <div data-aos="fade-left" class="description" data-aos-offset="300">
        <div>
          <h1>Qu’est-ce que Find Player ?</h1>
          <p class="text_description">
            C’est un site Communautaire ou tu peux <br>
            rencontrer des gens qui jouent aux<br>
            memes jeux que toi.
          </p>
        </div>
        <div class="buttons">
        <div class="container size2">
          <router-link to='/register' class="btn max_width2 effect01" ><span>Commence ton aventure ici !</span></router-link>
        </div>
      </div>
      </div>
      <div class="image3" data-aos="fade-right" data-aos-offset="400"></div>
      <div class="image4" data-aos="fade-down-right" data-aos-offset="400"></div>
      <div class="image5" data-aos="fade-up-right" data-aos-offset="200"></div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
      user:{type: Object}
  },
  data() {
    return {};
  },
  methods: {
    fonction_scroll(){
      window.scrollTo({top:1000, left:0})
    }
  },

};
</script>

<style scoped>
</style>


