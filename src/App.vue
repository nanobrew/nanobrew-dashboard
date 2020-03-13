<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      dark
      temporary
    >
      <v-list>
        <template v-for="(module, index) in modules">
          <v-list-item :key="index" :to="{name: module.link}" exact>
            <v-list-item-content>
              <v-list-item-title>{{module.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="background"
      elevation="0"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        nanobrew.io
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        color="background"
      >
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },

    data: () => ({
      drawer: false,
      modules: [
        {
          name: 'dashboard',
          link: 'dashboard'
        },
        {
          name: 'equipment',
          link: 'equipment'
        },
        {
          name: 'settings',
          link: 'settings',
        },
        {
          name: 'steps',
          link: 'steps',
          hidden: true,
        },
        {
          name: 'about',
          link: 'about',
        }
      ]
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script> 

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
@import url('https://fonts.googleapis.com/css?family=Passion%20One&display=swap');

.v-application {
  background-color: #2c2c2c !important;
  font-family: 'Muli', sans-serif;

  .v-navigation-drawer .v-list-item__content {
    .v-list-item__title {
      font-family: 'Passion One', sans-serif;
      font-size: 1.5em;
    }
  }

  .v-toolbar__title {
    font-family: 'Passion One', sans-serif;
    font-size: 1.8em;
  }

  h1, h2, h3, h4, h5 {
    font-family: 'Passion One', sans-serif;
    font-weight: normal;
  }
}
</style>