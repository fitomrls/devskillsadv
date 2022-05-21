<template>
  <v-card width="100%">
    <v-card-title>Create a Member</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pt-4">
      <v-form ref="form" v-model="valid" :lazy-validation="lazy">
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="fname"
              label="First Name"
              autocomplete="off"
              :rules="requiredRule"
              :error-messages="fnameError"
              outlined
              filled
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="lname"
              label="Last Name"
              autocomplete="off"
              :rules="requiredRule"
              :error-messages="lnameError"
              outlined
              filled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              v-model="address"
              label="Adress"
              autocomplete="off"
              :rules="requiredRule"
              :error-messages="addressError"
              outlined
              filled
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="ssn"
              label="Ssn"
              autocomplete="off"
              :rules="requiredRule"
              :error-messages="ssnError"
              outlined
              filled
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text rounded @click="reset">Reset</v-btn>
      <v-btn
        :disabled="!valid"
        @click="save"
        class="success"
        color="brown--text"
        :loading="loading"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Form",
  data() {
    return {
      fname: "",
      lname: "",
      address: "",
      ssn: "",
      fnameError: "",
      lnameError: "",
      addressError: "",
      ssnError: "",

      lazy: false,
      valid: false,
      loading: false,
      requiredRule: [(v) => !!v || "field required"],
    };
  },

  methods: {
    ...mapActions(["createMember"]),

    reset() {
      this.$refs.form.reset() 
      this.$refs.form.resetValidation();
    },

    formatSSN(val) {
      if (!val) return val;
      val = val.replace(/\D/g, '');
	    val = val.replace(/^(\d{3})/, '$1-');
	    val = val.replace(/-(\d{2})/, '-$1-');
	    val = val.replace(/(\d)-(\d{4}).*/, '$1-$2');
	    return val
    },

    save() {
     if (this.$refs.form.validate()){
        this.loading = true
        this.createMember({
            firstName: this.fname.trim(),
            lastName: this.lname.trim(),
            address: this.address.trim(),
            ssn: this.ssn.trim()
        }).then(response=>{
            this.loading = false
            this.reset()
            this.$root.$emit("message")
        })
     } 
    },
  },

  computed: {
    ...mapGetters(["members"]),
  },

  watch: {
    ssn(newValue, oldValue) {
      if(newValue!=null){
        this.ssn  = this.formatSSN(this.ssn)
        if (newValue.length >= 11) {
          const ssn = this.members.find((element) => element.ssn === newValue);
          if (ssn != undefined) {
            this.ssnError = `Ssn: ${newValue} already exists`;
          } else {
            this.ssnError = "";
          }
        }
      }
    },
  },
};
</script>

<style >
  input[type="text"],
  input[type="number"]{
    text-transform: capitalize;
  }
</style>