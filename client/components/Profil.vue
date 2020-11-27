<template v-if="user.id !== undefined">
  <div>
      <div class="block_button_menu">
      <router-link class="button_menu" data-aos="fade-right" to='/'>Accueil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/'>About</router-link>
    </div>
      
      <div class="container2">
        <div class="text1">
          <div class="image_profil"></div>
          <h2 class="username">{{this.user.username}}</h2>
          <button @click="logout()" class="btn max_width1 effect01"><span>Deconnexion</span></button>
          <p class="description_profil">{{this.user.description}}</p>
          <h2 class="titre_jeux">Jeux :</h2>
          <div class="games_list">
            <p class="game_item" v-for="item in user.games" :key="item">
              {{ item }}
            </p>
          </div>
        </div>
        <div class="text2">
          <h3>Information</h3>
          <div class="flexbox_information">
            <div class="item_flexbox">
              <p class="titre_description">age</p><br>
              <p>{{this.user.age}}</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">nationalite</p><br>
              <p>{{this.user.nationality}}</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">langue</p><br>
              <p>{{this.user.language}}</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">discord</p><br>
              <p>{{this.user.discord}}</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">ranking  </p><br>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star checked"></span>
              <span class="fa fa-star"></span>
              <span class="fa fa-star"></span>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">level</p><br>
              <p>12</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">jeu principal</p><br>
              <p>{{this.user.main_game}}</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">pseudo {{this.user.main_game}}</p><br>
              <p>{{this.user.pseudo_game}}</p>
            </div>
          </div>
        </div>
        <div class="text3">
          <p></p>
        </div>
      </div>
  </div>
    
</template>


<script>
module.exports = {
  props: {
    user:{type: Object}
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    logout(){
       this.$emit('logout')
    }
  }
};
</script>