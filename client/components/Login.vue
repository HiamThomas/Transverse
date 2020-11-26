<template>
  <div id="register">
    <div class="block_button_menu">
      <router-link class="button_menu_black" data-aos="zoom-in" data-aos-duration="1000" to='/'>Accueil</router-link>
      <p class="button_menu_black" data-aos="zoom-in">|</p>
      <router-link v-if="user.id == undefined" class="button_menu_black" data-aos="zoom-in" data-aos-duration="1000" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu_black" data-aos="zoom-in" data-aos-duration="1000" to='/profil'>Profil</router-link>
      <p class="button_menu_black" data-aos="zoom-in">|</p>
      <router-link class="button_menu_black" data-aos="zoom-in" data-aos-duration="1000" to='/'>About</router-link>
    </div>
    <div class="left_block_login">
      <div class="text_block_right">
        <h1 class="titre_register_right">Se connecter</h1>
        <form @submit.prevent='connect(username, password)'>
          <div class="block_form_login">
            <p class="text_form_login">Username</p>
            <div class="block_icon">
              <img class="icon" src="https://image.flaticon.com/icons/png/512/44/44948.png">
              <input type="username" v-model="username"><br>
            </div>
            <p class="text_form_login">Password</p>
            <div class="block_icon">
              <img class="icon" src="https://www.icone-png.com/png/30/29750.png">
              <input type="password" v-model="password">
            </div>
          </div>
          <div class="buttons center">
            <div class="container size1">
              <button type="submit" class="btn max_width1 effect01" ><span>Connexion</span></button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="right_block_login">
      <div class="text_block_left_login">
        <h1 class="titre_login_left">Vous êtes nouveaux ?</h1>
        <p class="paragraphe_right">Inscrivez-vous gratuitement ici</p>
        <div class="buttons center">
          <div class="container size1">
            <router-link to='/register' class="btn max_width1 effect01"><span>Inscription</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
module.exports = {
  props: {
    user:{type: Object}
  },
  data () {
    return {
      username:'',
      password:''
    }
  },
  async mounted () {
  },
  methods: {
    connect(username, password) {
      this.$emit("connect", username, password);
    }
  }
}
</script>

<style scoped>
</style>