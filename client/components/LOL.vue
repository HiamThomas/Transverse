<template>
    <div id="fortnite">
        <div class="block_button_menu">
        <router-link class="button_menu" data-aos="fade-right" to='/'>Accueil</router-link>
        <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
        <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
            <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
        <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Games</router-link>
        </div>
        <div class="block_jeux_1 lol_image_1">
            <div class="block_text_block_jeux">
                <div class="cadre_logo">
                <img class="logo_block_lol" src="../images/lol_logo.png"/>
                </div>
                <p class="text_block_jeux">Trouve un groupe qui<br>te correspond</p>
            </div>
            <div class="image_block_lol"></div>
        </div>
       
    </div>
</template>



<script>
module.exports = {
  props: {
    user:{type: Object}
  },
  data () {
    return {}
  },
  async mounted () {
  },
  methods: {}
}
</script>

<style scoped>
</style>