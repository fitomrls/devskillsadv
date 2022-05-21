<template>
  <v-app>
    <Menu v-if="loggedIn" />
    <v-main>
      <router-view />
    </v-main>
    <Credits />
  </v-app>
</template>

<script>
import Credits from "@/components/Credits";
import Menu from "@/components/Menu";

export default {
  name: "App",
  components: {
    Credits,
    Menu,
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },

  data: () => ({
    //
  }),
}
</script>
