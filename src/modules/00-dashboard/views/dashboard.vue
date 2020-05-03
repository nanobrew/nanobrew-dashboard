<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="8">
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
                                    {{sensor.unit.symbol}}
                                </span>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    sensors: {}
  }),
  created () {
    this.$vuetify.theme.dark = true

  },
  mounted() {
    axios.get('http://127.0.0.1:5300/sensors')
      .then(response => {
        this.sensors = response.data
      })

      this.$options.sockets.onmessage = (data) => {
        const incoming_event = JSON.parse(data.data);
        const sensor_id = incoming_event.sensor_id

        this.sensors[sensor_id].value = incoming_event.value
      }
  },
  methods: {
    clickButton: function() {
      this.$socket.send('Hello')
    }
  }
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
