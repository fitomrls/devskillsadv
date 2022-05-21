<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <Form></Form>
      </v-col>
      <v-col cols="6">
        <List></List>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Credits />
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="6000" top color="success">
      <p class="title black--text float-left">{{ message }}</p>
      <v-btn
        small
        icon
        class="success black--text float-right"
        text
        @click="snackbar = false"
        >x</v-btn
      >
    </v-snackbar>
  </v-container>
</template>

<script>
import Form from "@/components/Form"
import List from "@/components/List"
import Credits from "@/components/Credits"

export default {
  name: "Home",

  data() {
    return {
      snackbar: false,
      message: "",
    };
  },

  components: {
    Form,
    List,
    Credits
  },

  mounted() {
    this.$root.$on("message", () => {
      this.message = "Member registered!"
      this.snackbar = true
    })
  },
}
</script>
