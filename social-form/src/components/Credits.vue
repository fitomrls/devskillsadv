<template>
    <v-row class="credits">
        <v-col cols="6" class="text-center">
            Copyright
        </v-col>
        <v-col cols="6" class="text-center">
            All rights reserved
        </v-col>
    </v-row>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .credits{
        display: flex;
        justify-content: space-between;
        align-items: center;        
        height: 75px;
        color: #000;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }    
</style>