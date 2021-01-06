<template>
  <div>
    <div class="block1">
    <header>
      <div class="block_button_menu white">
        <router-link class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/'>Accueil</router-link>
        <p class="button_menu" data-aos="zoom-in">|</p>
        <router-link v-if="user.id == undefined" class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/login'>Connect</router-link>
        <router-link v-else class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/profil'>Profil</router-link>
        <p class="button_menu" data-aos="zoom-in">|</p>
        <router-link class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/'>About</router-link>
        <p class="button_menu" data-aos="zoom-in">|</p>
        <router-link v-if="user.id != undefined" class="button_menu" data-aos="zoom-in" data-aos-duration="1000" to='/games'>Games</router-link>
      </div>
    </header>
    <section>
        <br><br><br>
        
        
      <div style="margin:10px;">
          
<h2>Chat </h2>

<div class="containers" v-for="u in users" :key="u.id" >
    <router-link :to="{name: 'Message', params: {id: u.id,gameid: $route.params.id}}">
          <img src="https://i.pinimg.com/236x/ce/2a/95/ce2a95e99faceaf7af19c273b10ebcc1.jpg" alt="Avatar" style="width:100%;">
  <h3> {{u.username}}</h3>
  <h5>{{u.email}}</h5>
    </router-link>

</div>

      </div>
    </section>
  </div>
</template>

<script>

module.exports = {
  props: {
      user:{type: Object}
  },
  data() {
    return {
        users: [],
    };
  },
  methods: {
    fonction_scroll(){
      window.scrollTo({top:1000, left:0})
    },
},
  async created() {
    const res = await axios.post('/api/getAllUserByGames', { userId: this.user.id, gameId: this.$route.params.id }).then((result) => {
            this.users = result.data;
            console.log(this.users);
        }).catch((err) => {
            alert("Echec lors de la récupération");
        });
  },

};
</script>



<style>
.containers {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

.darker {
  border-color: #ccc;
  background-color: #ddd;
}

.containers::after {
  content: "";
  clear: both;
  display: table;
}

.containers img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

</style>