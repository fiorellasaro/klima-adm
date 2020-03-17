<template>
  <v-app>
    <v-app-bar app color="teal" dark>
      <div class="d-flex align-center justify-content-center">
        <v-img
          alt="Konecta Name"
          class="shrink"
          contain
          transition="scale-transition"
          src="../src/assets/k-blanco.png"
          width="40"
        />
        <b color="white" class="m-0" style="font-size: 25px;">lima admin</b>
      </div>
      <!-- <h2> - Clima</h2> -->
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <configuracion/>
    </v-content>
  </v-app>
</template>

<script>
import configuracion from './components/configuracion';

export default {
  name: 'App',

  components: {
    configuracion,
  },

  data: () => ({
    //
  }),
};
</script>
