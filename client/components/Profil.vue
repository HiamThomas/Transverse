<template v-if="user.id !== undefined">
  <div>
      <div class="block_button_menu">
      <router-link @click="logout()" class="button_menu" data-aos="fade-right" to='/login'>Déconnexion</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Jeux</router-link>
    </div>

    <div class="left_block">
      <div class="text_block_left">
        <div style="position:relative">
          <img class="image_profil" v-bind:src="this.user.photo" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">
          <input class="input input_image" v-if="this.editingProfil.id ==1" v-model="editingProfil.photo" placeholder="URL Image">
          <h2 class="username" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-delay="100" data-aos-once="true">{{this.user.username}}</h2>
          <button @click="logout()" class="btn max_width1 effect01" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-delay="200" data-aos-once="true"><span>Deconnexion</span></button>
          </div>
      </div>
    </div>
    <div class="right_block">
        <div class="block_profil">
            <button v-on:click="modifierInfo(user)" class="image_modifier"></button>
            <button v-if="this.editingProfil.id !=-1" v-on:click="sendInfo()" class= "image_valider"></button>
            <h3 class="titre_information">Information</h3>
            <div class="background_description" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">
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
            
            
            <div class="background_description_profil" data-aos="fade-left" data-aos-delay="100" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">
              <h3 class="titre_description_profil">Description</h3>
              <p class="description_profil" v-if="this.editingProfil.id ==-1">{{this.user.description}}</p>
              <textarea class="input input_description" v-else type="text" v-model="editingProfil.description" :placeholder="this.user.description"><br></textarea>
            </div>

            <div class="background_jeux_profil" data-aos="fade-left" data-aos-delay="200" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">
              <h3 class="titre_jeux">Jeux</h3>
              <input class="input input_profil" v-if="this.editingProfil.id ==1" v-model="elementTableau" placeholder="Ajouter un jeu">
              
              <div class="games_list">
                <div class="game_item" v-for="(item, index) in user.games" v-bind:key="item">
                  {{ item }}
                  <button v-on:click="deleteItem(index)"><img class="image_supprimer" src="../images/supprimer.png"></button>
                </div>
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
        games:[]
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
    deleteItem(index){
      this.editingProfil.games = this.user.games;
      var removedItem = (this.editingProfil.games).splice(index,1);
      this.sendInfo();
    },
    sendInfo(){
      if(this.elementTableau != ""){
        if(this.editingProfil.games === null)
          this.editingProfil.games =[];
        this.editingProfil.games.push(this.elementTableau);
      }
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
        games:[]
        };
    }
  }
};
</script>