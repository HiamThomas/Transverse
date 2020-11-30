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
          <div style="position:relative">
            <img class="image_profil" v-bind:src="this.user.photo">
            <input class="input input_image" v-if="this.editingProfil.id ==1" v-model="editingProfil.photo" placeholder="URL Image">
          </div>
          <h2 class="username">{{this.user.username}}</h2>
          <button @click="logout()" class="btn max_width1 effect01"><span>Deconnexion</span></button>

          <p class="description_profil" v-if="this.editingProfil.id ==-1">{{this.user.description}}</p>
          <textarea class="input input_description" v-else type="text" v-model="editingProfil.description" :placeholder="this.user.description"><br></textarea>

          <h2 class="titre_jeux">Jeux :</h2>
          <input class="input input_profil" v-if="this.editingProfil.id ==1" v-model="elementTableau" placeholder="Ajouter un jeu">
          <div class="games_list">
            <p class="game_item" :id="item" v-for="item in user.games" :key="item">
              {{ item }}
            </p>
          </div>

        </div>
        <div class="text2">
          <button v-on:click="modifierInfo(user)"><img class="image_modifier" src="../images/modifier.png"></button>
          <button v-if="this.editingProfil.id !=-1" v-on:click="sendInfo()"><img class="image_modifier" src="../images/valider.png"></button>
          <h3>Information</h3>
          <div class="flexbox_information">
            <div class="item_flexbox">
              <p class="titre_description">age</p><br>
              <p class="description_info" v-if="this.editingProfil.id ==-1">{{user.age}}</p>
                <input class="input input_profil" v-else type="number" min="0" v-model.number="editingProfil.age" :placeholder="this.user.age">
            </div>
            <div class="item_flexbox">
              <p class="titre_description">nationalite</p><br>
              <p class="description_info" v-if="this.editingProfil.id ==-1">{{user.nationality}}</p>
                <input class="input input_profil" v-else type="text" v-model="editingProfil.nationality" :placeholder="this.user.nationality"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">langue</p><br>
              <p class="description_info" v-if="this.editingProfil.id ==-1">{{user.language}}</p>
                <input class="input input_profil" v-else type="text" v-model="editingProfil.language" :placeholder="this.user.language"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">discord</p><br>
              <p class="description_info" v-if="this.editingProfil.id ==-1">{{user.discord}}</p>
                <input class="input input_profil" v-else type="text" v-model="editingProfil.discord" :placeholder="this.user.discord"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">ranking</p><br>
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
              <p class="description_info" v-if="this.editingProfil.id ==-1">{{user.main_game}}</p>
                <input class="input input_profil" v-else type="text" v-model="editingProfil.main_game" :placeholder="this.user.main_game"><br>
            </div>
            <div class="item_flexbox">
              <p class="titre_description">pseudo {{this.user.main_game}}</p><br>
              <p class="description_info" v-if="this.editingProfil.id ==-1">{{user.pseudo_game}}</p>
                <input class="input input_profil" v-else type="text" v-model="editingProfil.pseudo_game" :placeholder="this.user.pseudo_game"><br>
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
      elementTableau:'',
      editingProfil: {
        id:-1,
        age:'',
        nationality:'',
        language:'',
        discord:'' ,
        main_game: '',
        pseudo_game: '',
        description:'',
        photo:'',
        games:''
      }
    }
  },
  mounted() {
    
  },
  methods: {
    logout(){
       this.$emit('logout')
    },
    modifierInfo(user) {
      this.editingProfil.id = 1;
      this.editingProfil.nationality = user.nationality;
      this.editingProfil.language = user.language;
      this.editingProfil.discord = user.discord;
      this.editingProfil.main_game = user.main_game;
      this.editingProfil.age = user.age;
      this.editingProfil.pseudo_game = user.pseudo_game;
      this.editingProfil.description = user.description;
      this.editingProfil.photo = user.photo;
      this.editingProfil.games = user.games;
    },
    sendInfo(){
      this.editingProfil.games.push(this.elementTableau);
      console.log(this.editingProfil.games);
      this.$emit("modifier-info", this.editingProfil);
      this.restartInfo();
    },
    restartInfo(){
      this.elementTableau = '';
      this.editingProfil = {
        id:-1,
        age:'',
        nationality:'',
        language:'',
        discord:'' ,
        main_game: '',
        pseudo_game: '',
        description:'',
        photo:'',
        games:''
        };
    }
  }
};
</script>