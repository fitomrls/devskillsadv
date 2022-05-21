<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="orange darken-1 elevation-12 login-form"
          height="40vh"
          dark
        >
          <v-card-text>
            <v-form>
              <v-text-field
                append-icon="mdi-account"
                name="login"
                label="Login"
                type="text"
                v-model="username"
                :error="error"
                :rules="[rules.required]"
                autocomplete="off"
              ></v-text-field>

              <v-text-field
                :type="hidePassword ? 'password' : 'text'"
                :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                name="password"
                label="Password"
                id="password"
                :rules="[rules.required]"
                v-model="password"
                :error="error"
                @click:append="hidePassword = !hidePassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              block
              class="white brown--text"
              @click="login"
              :loading="loading"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="showResult" :timeout="2000" top>{{
      result
    }}</v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "sarah",
      password: "connor",
      hidePassword: true,
      loading: false,
      error: false,
      showResult: false,
      result: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.loading = false;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.$root.$on("validUser", (user) => {
      this.result = "Bienvenido " + user.nombres + ", ingresa al sistema";
      this.showResult = true;
    });
  },
};
</script>

<style scoped>
    .login-form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
</style>