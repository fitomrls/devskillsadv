<template>
  <div id="app">
    <Menu v-if="loggedIn" />
    <router-view/>
    <Credits />
  </div>
</template>

<script>
import Credits from '@/components/Credits'
import Menu from '@/components/Menu'


  export default{
    name: "App",
    components: {
      Credits,
      Menu
    },
    computed: {
      loggedIn() {
        return this.$store.getters.isLoggedIn
      }
    },


  }


</script>


<style >

  body{
    margin: 0;
    padding: 0;
  }
  #app {    
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    background: crimson;
  }

  a{
    text-decoration: none;
  }

</style>
