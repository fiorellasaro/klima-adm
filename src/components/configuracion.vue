<template>
  <v-container>
    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="number"
        type="number"
        min="0"
        label=" Nº Colaboradores"
        :rules="[numberRule]"
        required
      ></v-text-field>

      <v-container fluid>
        <p>Dimensiones</p>
        <div class="flex-box">
          <div class="flex-column">
            <v-checkbox v-model="selected.credibilidad" label="Credibilidad"></v-checkbox>
            <v-checkbox v-model="selected.respeto" label="Respeto"></v-checkbox>
            <v-checkbox v-model="selected.imparcialidad" label="Imparcialidad"></v-checkbox>
          </div>
          <div class="flex-column">
            <v-checkbox v-model="selected.orgullo" label="Orgullo"></v-checkbox>
            <v-checkbox v-model="selected.camaraderia" label="Camaraderia + preguntas nacionales"></v-checkbox>
            <v-checkbox
              v-model="selected.all"
              label="Todas las dimensiones"
              @change="allDimensions()"
            ></v-checkbox>
          </div>
        </div>
      </v-container>
      <v-btn color="primary" @click="randomCode(number, selected)">CREAR CÓDIGOS</v-btn>
    </v-form>
      <v-data-table
    v-if="generatedCode"
    :headers="headers"
    :search="search"
    :items="codesDimensions"
    sort-by="number"
    class="elevation-1"
  >

      </v-data-table>
   
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "configuracion",

  data: () => ({
    valid: true,
    codes: {},
    generatedCode: false,
    codesDimensions: [],
    number: "",
    selected: {
      credibilidad: false,
      respeto: false,
      imparcialidad: false,
      orgullo: false,
      camaraderia: false,
      all: false
    },

        headers: [
      {
        text: "Nº",
        align: "left",
        value: "number"
      },
      {
        text: "Código",
        value: "code"
      },
      {
        text: "Dimensiones",
        value: "dimensions"
      },

    ],
    numberRule: val => {
      if (val < 0) return "Por favor, ingrese un número positivo";
      return true;
    }
  }),

  methods: {
    randomCode(number, dimensions) {
      for (let i = 0; i < number; i++) {
        let code;
        let codeDimension={
          number: 0,
          code:0,
          dimensions:[]  
        };

        do {
          code = (Math.random() + +new Date()).toString(36).replace(".", "");
        } while (!this.getUnique(code)); //return true if is unique

        firebase
          .database()
          .ref("CODIGOS")
          .child(code) //codigo
          .set(this.getDimensions(dimensions));

        codeDimension.number = i+1;
        codeDimension.code = code;
        codeDimension.dimensions = this.getDimensions(dimensions);
        console.log(codeDimension);
        this.codesDimensions.push(codeDimension);

      }


      this.generatedCode = true;

      //codesDimensions

    },
    allDimensions() {
      if (this.selected.all == false) {
        this.selected.credibilidad = false;
        this.selected.respeto = false;
        this.selected.imparcialidad = false;
        this.selected.orgullo = false;
        this.selected.camaraderia = false;
        this.selected.all = false;
      } else {
        this.selected.credibilidad = true;
        this.selected.respeto = true;
        this.selected.imparcialidad = true;
        this.selected.orgullo = true;
        this.selected.camaraderia = true;
        this.selected.all = true;
      }
    },
    getDimensions(dimensions) {
      let dimensionsArray = [];
      if (dimensions.all == true) {
        dimensionsArray = [
          "CREDIBILIDAD",
          "RESPETO",
          "IMPARCIALIDAD",
          "ORGULLO",
          "CAMARADERIA"
        ];
      } else {
        if (dimensions.credibilidad == true) {
          dimensionsArray.push("CREDIBILIDAD");
        }
        if (dimensions.respeto == true) {
          dimensionsArray.push("RESPETO");
        }
        if (dimensions.imparcialidad == true) {
          dimensionsArray.push("IMPARCIALIDAD");
        }
        if (dimensions.orgullo == true) {
          dimensionsArray.push("ORGULLO");
        }
        if (dimensions.camaraderia == true) {
          dimensionsArray.push("CAMARADERIA");
        }
      }

      return dimensionsArray;
    },
    getUnique(code) {
      let unique = 0;
      let codes = firebase.database().ref("CODIGOS");
      if (codes == undefined) {
        return true;
      } else {
        codes.on("value", this.getCodes, this.codigosErr);
      }

      for (let codigos in this.codes) {
        if (codigos == code) {
          unique++;
        }
      }
      if (unique == 0) {
        return true;
      } else {
        return false;
      }
    },
    getCodes(data) {
      this.codes = data.val();
    },
    codigosErr(err) {
      console.log("error");
      console.log(err);
    }
  }
};
</script>

<style>
.flex-box {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.flex-column {
  display: flex;
  width: 45%;
  flex-direction: column;
}
</style>
