<template>
  <div>
    <div class="block1">
    <header>
      <div class="block_button_menu">
      <router-link class="button_menu" data-aos="fade-right" to='/login'><button @click="logout()" class="button_deconnexion">Déconnexion</button></router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="50">|</p>
      <router-link v-if="user.id == undefined" class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/login'>Connexion</router-link>
        <router-link v-else class="button_menu" data-aos="fade-right" data-aos-delay="100" to='/profil'>Profil</router-link>
      <p class="button_menu" data-aos="fade-right" data-aos-delay="150">|</p>
      <router-link v-if="user.id != undefined" class="button_menu" data-aos="fade-right" data-aos-delay="200" to='/games'>Jeux</router-link>
    </div>
    </header>
    <div class="left_block">
      <div class="text_block_left">
        <h1 class="titre_register_left" data-aos="fade-right" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">Sélectionne Un Jeu</h1>
        <p class="paragraphe_left" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">Choisis un jeu pour trouver un groupe cherchant un joueur</p>
      </div>
    </div>
    <div class="right_block">
        <section style="text-align:center">
          <br><br><br>
          <div v-for="game in games" :key="game.id" class="card img-fluid" data-aos="fade-left" data-aos-anchor-placement="bottom-bottom" data-aos-once="true">
              <img @click="navigate(game.id)" class="card-img-top" v-bind:src="game.image" alt="Card image" />
              <div class="card-img-overlay">
                <div @click="navigate(game.id)" class="absolute card-body-libelle" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-delay="300" data-aos-once="true">
                  {{ game.name }}
                </div>
              </div>
            </div>
        </section>
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
        games: [],
    };
  },
  methods: {
    logout(){
       this.$emit('logout')
    },
    fonction_scroll(){
      window.scrollTo({top:1000, left:0})
    },
    navigate(id){
        window.location.href = '#/game/'+id;
    },
  async addToListGames(gameId){
          const res = await axios.post('/api/addToListGames', { userId: this.user.id, gameId: gameId }).then((result) => {
              alert("Ajout dans la liste effectuée");
          }).catch((err) => {
              alert("Jeu déjà ajouter à la liste");
          });
    },
  
},
  async created() {
     const res = await axios.get('/api/games')
    this.games = res.data;
  },

};
</script>

<style scope>
    .img-fluid:hover img {
        top: 50%;
        left: 50%;
        transform: scale(1.2) translate(-40%, -40%);
        filter: brightness(90%) blur(0px);
    }

    .img-fluid img {
        transition: transform 1s ease;
    }

    .img-fluid {
        position: relative;
        width: 300px;
        height: 400px;
        overflow: hidden;
        border-radius: 30px;
        display: inline-block;
        margin-bottom: 3%;
        margin-left: 3%;
        margin-right: 3%;
        border: solid;
        border-width: 1px 1px 1px 1px;
        cursor: pointer;
        box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034), 0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06), 0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
    }

        
    .card-img-top {
        position: relative;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        height: 400px;
    }

    .card-body-libelle {
        font-size: 1.6em;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
        position: absolute;
        width: 90%;
        bottom: 50%;
        transform: translate(0,50%);
        left: 5%;
        padding: 1%;
        text-align: center;
        color: white;
        font-weight: bold;
        text-shadow: -1px 0 black, 0 1.5px black, 1.5px 0 black, 0 -1px black;
    }

    .card-body-libelle span {
        color:white;
    }
</style>


