<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container mt-4">
    <h1 class="text-center">Lista de Estudiantes</h1>

    <!-- Tabla de Estudiantes -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="estudiante in estudiantes" :key="estudiante.codigo">
            <td>{{ estudiante.codigo }}</td>
            <td>{{ estudiante.nombre }}</td>
            <td>{{ estudiante.telefono }}</td>
            <td>
              <button @click="eliminarEstudiante(estudiante.codigo)" class="btn btn-danger btn-sm">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Formulario -->
    <h2 class="mt-4">Agregar Estudiante</h2>
    <div class="row">
      <div class="col-md-5">
        <input v-model="nuevoEstudiante.nombre" class="form-control mb-2" placeholder="Nombre" required />
      </div>
      <div class="col-md-5">
        <input v-model="nuevoEstudiante.telefono" class="form-control mb-2" placeholder="Teléfono" required />
      </div>
      <div class="col-md-2">
        <button @click="agregarEstudiante" class="btn btn-primary w-100">Agregar</button>
      </div>
    </div>

    <!-- Mensaje de éxito -->
    <div v-if="mensaje" class="alert alert-success mt-3" role="alert">
      {{ mensaje }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      estudiantes: [],
      nuevoEstudiante: { nombre: "", telefono: "" },
      mensaje: "",
    };
  },
  methods: {
    async obtenerEstudiantes() {
      try {
        const response = await axios.get("http://localhost:8081/api/listar");
        this.estudiantes = response.data;
      } catch (error) {
        console.error("Error al obtener estudiantes:", error);
      }
    },
    async agregarEstudiante() {
      try {
        const response = await axios.post("http://localhost:8081/api/guardar", this.nuevoEstudiante);

        // Agregar el nuevo estudiante a la lista sin recargar
        this.estudiantes.push(response.data);

        // Limpiar los campos
        this.nuevoEstudiante = { nombre: "", telefono: "" };

        // Mensaje de éxito
        this.mensaje = "Estudiante agregado correctamente";
        setTimeout(() => (this.mensaje = ""), 3000);
      } catch (error) {
        console.error("Error al agregar estudiante:", error);
      }
    },
    async eliminarEstudiante(codigo) {
      if (confirm("¿Estás seguro de que quieres eliminar este estudiante?")) {
        try {
          await axios.delete(`http://localhost:8081/api/eliminar/${codigo}`);

          // Filtrar la lista para eliminar el estudiante sin recargar
          this.estudiantes = this.estudiantes.filter(e => e.codigo !== codigo);

          // Mensaje de éxito
          this.mensaje = "Estudiante eliminado correctamente";
          setTimeout(() => (this.mensaje = ""), 3000);
        } catch (error) {
          console.error("Error al eliminar estudiante:", error);
        }
      }
    },
  },
  mounted() {
    this.obtenerEstudiantes();
  },
};
</script>
