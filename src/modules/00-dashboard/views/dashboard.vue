<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="(sensor, key) in sensors" :key="key" cols="12" sm="6" md="3" lg="3">
                <v-card class="ma-3 pa-4 nb-card" tile>
                    <h2>{{sensor.name}}</h2>
                    <!-- TODO: Add folding menu here. -->

                    <div class="nb-measurement py-4">
                        <span class="nb-value">
                            {{sensor.value}}
                        </span>

                        <span class="nb-unit">
                            {{sensor.unit}}
                        </span>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: false,
      sensors: [
        {
          id: '1',
          name: 'hot liquor tank',
          value: '78',
          unit: '°C',
        },
        {
          id: '2',
          name: 'mash tun',
          value: '26',
          unit: '°C',
        },
        {
          id: '3',
          name: 'boil kettle',
          value: '55',
          unit: '°C',
        },
        {
          id: '3',
          name: 'boil pressure',
          value: '55',
          unit: 'PSI',
        },
      ]
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script> 

<style scoped lang="scss">
.nb-card {
    background-color: #3c3c3c;
}

.nb-measurement {
    .nb-value {
        vertical-align: top;
        font-size: 3em;
        line-height: 1em;
        font-weight: bold;
    }

    .nb-unit {
        vertical-align: top;
        line-height: 1em;
        font-size: 1.5em;
    }
}
</style>
