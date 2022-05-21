import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import router from '../router'

Vue.use(Vuex)

axios.defaults.baseURL = "http://localhost:8081/api"

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    members: []
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    members: (state)=> state.members,
  },
  mutations: {
    logout(state) {
      state.status = ""
      state.token = ""
      state.user = {}
    },
    SET_TOKEN(state, token) {
      state.status = "success"
      state.token = token
    },
    expires(state) {
      state.status = "token timeout"
    },
    SET_MEMBERS(state, payload) {
      state.members = payload
    },
    SET_DEFAULT_MEMBERS(state){
      state.members = null
    },
    CREATE_MEMBER(state, payload){
      state.members.push(payload)
    }
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: "http://localhost:8081/auth", data: user, method: "POST" })
          .then((resp) => {
              const token = resp.data.token            
              localStorage.setItem("token", token)
              axios.defaults.headers.common["Authorization"] = token
              commit("SET_TOKEN", token)
              resolve(resp)
          })
          .catch((err) => {
            //commit("SET_AUTH_ERROR")
            localStorage.removeItem("token")
            reject(err)
          })
      })
    },    

    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("logout")
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        delete axios.defaults.headers.common["Authorization"]
        resolve()
      })
    },

    retrieveMembers(context, data){
      return new Promise( (resolve, reject) =>{
        axios.defaults.headers.common["Authorization"] =
        "Bearer " + context.state.token
        context.commit("SET_DEFAULT_MEMBERS")
        axios({
          url: "/members",
          data: data,
          method: "GET"
        }).then((response)=>{
          context.commit("SET_MEMBERS", response.data)
          //resolve()
        }).catch(err=> {
          if(err.response.status==401){
            router.replace({ path: '/login' })
          }
        })
      })
    },

    createMember(context, data) {
      return new Promise((resolve, reject) => {
          axios.defaults.headers.common["Authorization"] =
          "Bearer " + context.state.token
          axios({ url: "/members", data: data, method: "POST" })
          .then((response) => {
            //data.id = response.id
            context.commit("CREATE_MEMBER", data)
            resolve('ok')
          })
          .catch((err) => {
            console.error('createMember',err)
          })
      })
    },


  },
  modules: {
  }
})
