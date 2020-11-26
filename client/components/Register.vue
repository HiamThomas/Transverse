<template>
  <div id="register">
    <div class="block_button_menu">
      <router-link class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/'>Accueil</router-link>
      <p class="button_menu" data-aos="zoom-in">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="zoom-in">|</p>
      <router-link class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/'>About</router-link>
    </div>
    <div class="left_block">
      <div class="text_block_left">
        <h1 class="titre_register_left">Welcome Back</h1>
        <p class="paragraphe_left">Vous avez deja un compte,<br>connecter vous ici</p>
        <div class="buttons center">
          <div class="container size1">
            <router-link to='/login' class="btn max_width1 effect01" ><span>Connexion</span></router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="right_block">
      <div class="text_block_right">
        <h1 class="titre_register_right">Creer un compte</h1>
        <form @submit.prevent='addRegister(username, email, password , password2)'>
          <div class="block_form">
            <p class="text_form">Username</p>
            <div class="block_icon">
              <img class="icon" src="https://image.flaticon.com/icons/png/512/44/44948.png">
              <input type="username" v-model="username"><br>
            </div>
            <p class="text_form">Email</p>
            <div class="block_icon">
              <img class="icon" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-email-512.png">
              <input type="email" v-model="email"><br>
            </div>
            <p class="text_form">Password</p>
            <div class="block_icon">
              <img class="icon" src="https://www.icone-png.com/png/30/29750.png">
              <input type="password" v-model="password">
            </div>
            <p class="text_form">Confirm</p>
            <div class="block_icon">
              <img class="icon" src="https://www.icone-png.com/png/30/29750.png">
              <input type="password" v-model="password2">
            </div>
          </div>
          <div class="buttons center">
            <div class="container size1">
              <button type="submit" class="btn max_width1 effect01" ><span>Inscription</span></button>
            </div>
          </div>
        </form>
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
      email:'',
      password:'',
      password2:''
    }
  },
  async mounted () {
  },
  methods: {
    addRegister(username, email, password , password2) {
      if (password === password2 ){
        this.$emit('add-register', username , email, password)
      }
      else
      {
        console.log("password not match");
      }
    }
  }
}
</script>

<style scoped>

</style>