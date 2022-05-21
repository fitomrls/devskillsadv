<template>
    <v-card dark max-width="100%">
        <v-simple-table fixed-header height="auto">
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">##</th>
                <th class="text-left">First Name</th>
                <th class="text-left">Last Name</th>
                <th class="text-left">Address</th>
                <th class="text-left">Ssn</th>
                <th class="text-center">
                    opt
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in members" :key="item.ssn">
                <td>{{ index+1 }}</td>
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.ssn }}</td>
                <td>
                    <v-btn x-small fab>
                        <v-icon small>mdi-pencil</v-icon>
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </template>
        </v-simple-table>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "List",

  methods: {
    ...mapActions(["retrieveMembers"]),
  },

  computed: {
    ...mapGetters(["members"]),
  },

  mounted() {
    this.retrieveMembers();
  },
};
</script>

<style>
</style>