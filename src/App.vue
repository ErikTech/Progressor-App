<template>
  <v-app>
    <v-app-bar app color="primary" dark>
<h1> Progressor</h1>
    </v-app-bar>

    <v-main>
      <Main />
    </v-main>
  </v-app>
</template>

<script>
import Main from "./components/Main";

export default {
  name: "App",

  components: {
    Main
  },

  data: () => ({
    //
  })
};
</script>
