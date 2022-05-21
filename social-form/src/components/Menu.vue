<template>
    <v-container>
        <v-row>
            <v-col cols="4" class="text-center">
                <router-link to="/">Home</router-link>
            </v-col>
            <v-col cols="4" class="text-center">
                <router-link to="/other">Other Page</router-link>
            </v-col>
            <v-col cols="4" class="text-center">
                <a href="#" @click="logout" >Logout</a>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Menu",
        methods: {
            logout() {
                this.$store.dispatch("logout").then(() => {
                    this.$router.push("/login")
                })
            }
        },
    }
</script>

<style scoped>

    a.router-link-exact-active.router-link-active{
        color: crimson;
    }

    a.router-link-active{
        color: #ccc;
    }

    a{
        text-decoration: none;
    }

</style>