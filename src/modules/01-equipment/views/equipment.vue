<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col lg=6>
          <sensors />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import sensors from './sensors'

export default {
  components: {
    sensors
  },
  props: {
  },
  data: () => ({
  })
}
</script>