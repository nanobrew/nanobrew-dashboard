<template>
  <div>
    <v-data-table :headers="headers" :items="sensors">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Sensors</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Add sensor</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.sensor_name" label="Sensor name"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="editedItem.sensor_type"
                        label="Sensor type"
                        :items="sensor_types"
                        item-text="name"
                        @change="renderFields"
                      ></v-select>
                    </v-col>

                    <v-col cols="12" v-for="(field, key) in fields" :key="key">
                      <component
                        :is="field.field_type"
                        :label="field.label"
                        :items="field.options"
                        :type="field.type"
                        step="0.1"
                        v-model="editedItem.parameters[field.name]"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    source: String
  },
  data: () => ({
    dialog: false,
    sensors: [],
    headers: [
      { text: "Name", value: "sensor_name" },
      { text: "id", value: "sensor_id" },
      { text: "type", value: "sensor_type" },
      { text: "unit", value: "unit" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    sensor_types: {},
    sensor_type_names: [],
    editedItem: {
      sensor_name: "",
      sensor_type: "",
      sensor_id: "",
      parameters: {}
    },
    defaultItem: {
      sensor_name: "",
      sensor_type: "",
      sensor_id: "",
      parameters: {}
    },
    editedIndex: -1,
    fields: []
  }),
  watch: {
    dialog(val) {
      if (!val) {
        this.close();
      }
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add sensor" : "Edit sensor";
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted() {
    this.loadSensors();

    axios.get("http://127.0.0.1:5300/sensor_types").then(response => {
      this.sensor_types = Object.values(response.data);
    });
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.sensors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.renderFields(this.editedItem.sensor_type);
      this.dialog = true;
    },

    renderFields(selected_sensor_type) {
      const sensor_type = this.sensor_types.find(
        element => (element.name = selected_sensor_type)
      );

      let fields = [];

      for (let option_name in sensor_type.options) {
        let option = sensor_type.options[option_name];

        let field = {
          label: option.label,
          name: option_name
        };

        if (option.option_type == "enum") {
          fields.push(
            Object.assign(field, {
              field_type: "v-select",
              options: Object.values(option.options)
            })
          );
        }

        if (option.option_type == "decimal") {
          fields.push(
            Object.assign(field, {
              field_type: "v-text-field",
              type: "number"
            })
          );
        }
      }

      this.fields = fields;
    },

    prepParameters(options) {
      let parameters = [];
      for (let option_name in options) {
        parameters[option_name] = "";
      }
      this.editedItem.parameters = parameters;
    },

    resetDialog() {
      this.fields = [];
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.delete(item.sensor_id);
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.resetDialog();
      });
    },

    loadSensors() {
      axios.get("http://127.0.0.1:5300/sensors").then(response => {
        const sensors = [];

        for (var sensor_id in response.data) {
          sensors.push({
            sensor_id: sensor_id,
            sensor_type: response.data[sensor_id].type,
            sensor_name: response.data[sensor_id].name,
            unit: response.data[sensor_id].unit.name,
            parameters: response.data[sensor_id].parameters
          });
        }

        this.sensors = sensors;
      });
    },

    save() {
      const sensor = {
        name: this.editedItem.sensor_name,
        sensor_type: this.editedItem.sensor_type,
        parameters: this.editedItem.parameters
      };

      if (this.editedIndex > -1) {
        this.update(this.editedItem.sensor_id, sensor)
      } else {
        this.insert(sensor)
      }
      this.close()
    },

    insert(sensor) {
      axios.post("http://127.0.0.1:5300/sensors", sensor).then(() => {
        this.loadSensors();
      })
    },

    update(sensor_id, sensor) {
      axios.put("http://127.0.0.1:5300/sensors/" + sensor_id, sensor).then(() => {
        this.loadSensors();
      })
    },

    delete(sensor_id) {
      axios.delete("http://127.0.0.1:5300/sensors/" + sensor_id).then(() => {
        this.loadSensors();
      })
    }
  }
};
</script>