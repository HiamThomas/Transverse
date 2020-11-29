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
          <img class="image_profil" v-bind:src="this.user.photo">
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
          <button v-on:click="modifier=1"><img class="image_modifier" src="../images/modifier.png"></button>
          <button v-if="modifier==1" v-on:click="modifierInfo()"><img class="image_modifier" src="../images/valider.png"></button>
          <h3>Information</h3>
          <div class="flexbox_information">
            <div class="item_flexbox">
              <p class="titre_description">age</p><br>
              <p class="description_info" v-if="modifier!=1">{{this.user.age}}</p>
                <input v-else type="number" v-model.number="editingProfil.age" :placeholder="this.user.age"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">nationalite</p><br>
              <p class="description_info" v-if="modifier!=1">{{this.user.nationality}}</p>
                <input v-else type="text" v-model="editingProfil.nationality" :placeholder="this.user.nationality"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">langue</p><br>
              <p class="description_info" v-if="modifier!=1">{{this.user.language}}</p>
                <input v-else type="text" v-model="editingProfil.language" :placeholder="this.user.language"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">discord</p><br>
              <p class="description_info" v-if="modifier!=1">{{this.user.discord}}</p>
                <input v-else type="text" v-model="editingProfil.discord" :placeholder="this.user.discord"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">ranking  </p><br>
              <p class="description_info">
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">level</p><br>
              <p class="description_info">12</p>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">jeu principal</p><br>
              <p class="description_info" v-if="modifier!=1">{{this.user.main_game}}</p>
                <input v-else type="text" v-model="editingProfil.main_game" :placeholder="this.user.main_game"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">pseudo {{this.user.main_game}}</p><br>
              <p class="description_info" v-if="modifier!=1">{{this.user.pseudo_game}}</p>
                <input v-else type="text" v-model="editingProfil.pseudo_game" :placeholder="this.user.pseudo_game"><br>
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
      modifier:0,
      editingProfil: {
        age:this.user.age,
        nationality: this.user.nationality,
        language: this.user.language,
        discord: this.user.discord,
        main_game: this.user.main_game,
        pseudo_game: this.user.pseudo_game
      }
    }
  },
  mounted() {
  },
  methods: {
    logout(){
       this.$emit('logout')
    },
    modifierInfo() {
      if(this.editingProfil.age == "")
        this.editingProfil.age = this.user.age;
      if(this.editingProfil.nationality == "")
        this.editingProfil.nationality = this.user.nationality;
      if(this.editingProfil.language == "")
        this.editingProfil.language = this.user.language;
      if(this.editingProfil.discord == "")
        this.editingProfil.discord = this.user.discord;
      if(this.editingProfil.main_game == "")
        this.editingProfil.main_game = this.user.main_game;
      if(this.editingProfil.pseudo_game == "")
        this.editingProfil.pseudo_game = this.user.pseudo_game;
      this.$emit("modifier-info", this.editingProfil);
      this.modifier=0;
    }
  }
};
</script>