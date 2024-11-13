const host = "http://localhost:8080/";

const service = {
  async getAllPerson() {
    try {
      const response = await fetch(host.concat("person/v1/list"));
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.log("Error llamando el servicio listar:", error);
      throw error;
    }
  },

  async getByIdPerson(id) {
    try {
      const response = await fetch(host.concat("person/v1/search/".concat(id)));
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.error("Error llamando el servicio consultar por id:", error);
    }
  },

  async deleteByIdPerson(id) {
    try {
      const response = await fetch(host.concat("person/v1/delete?id=".concat(id)));
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      await this.recargarTabla();
    } catch (error) {
      console.error("Error llamando el servicio de eliminación:", error);
    }
  },

  async savePerson(data) {
    try {
      const apiSave = host.concat("person/v1/save");
      const response = await fetch(apiSave, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      return await response.json();
    } catch (error) {
      console.error("Error llamando el servicio de guardado:", error);
    }
  },

  async callUpdatePerson(data) {
    try {
      const apiSave = host.concat("person/v1/update");
      const response = await fetch(apiSave, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Tenemos una falla en el servicio invocado");
      }
      await this.recargarTabla(); 
    } catch (error) {
      console.error("Error llamando el servicio de actualización:", error);
    }
  },

  openModalUpdate(id, nombre, apellido, fechaNacimiento, lugarNacimiento, estadoSistema) {
    document.getElementById('modalId').value = id;
    document.getElementById('modalNombre').value = nombre;
    document.getElementById('modalApellido').value = apellido;
    document.getElementById('modalFechaNacimiento').value = fechaNacimiento;
    document.getElementById('modalLugarNacimiento').value = lugarNacimiento;
    document.getElementById('modalEstadoSistema').value = estadoSistema;

    const modal = new bootstrap.Modal(document.getElementById('dataModal'));
    modal.show();
  },

  updatePerson() {
    const personId = document.getElementById('modalId').value;
    const personNombre = document.getElementById('modalNombre').value;
    const personApellido = document.getElementById('modalApellido').value;
    const personFechaNacimiento = document.getElementById('modalFechaNacimiento').value;
    const personLugarNacimiento = document.getElementById('modalLugarNacimiento').value;
    const personEstadoSistema = document.getElementById('modalEstadoSistema').value;

    const data = {
      id: personId,
      nombre: personNombre,
      apellido: personApellido,
      fechaNacimiento: personFechaNacimiento,
      lugarNacimiento: personLugarNacimiento,
      estadoSistema: personEstadoSistema
    };

    this.callUpdatePerson(data);
  },

  // Función para renderizar la tabla
  renderTabla(data) {
    const dateble = document.querySelector("#dataTableUsuarios tbody");
    try {
      dateble.innerHTML = "";
      data.forEach((person) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <th>${person.id}</th>
          <td>${person.nombre}</td>
          <td>${person.apellido}</td>
          <td>${person.fechaNacimiento}</td>
          <td>${person.lugarNacimiento}</td>
          <td>${person.estadoSistema}</td>
          <td>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
              <button type="button" class="btn btn-outline-warning" onclick="service.openModalUpdate(${person.id}, '${person.nombre}', '${person.apellido}', '${person.fechaNacimiento}', '${person.lugarNacimiento}', '${person.estadoSistema}')">Actualizar Usuario</button>
              <button type="button" class="btn btn-outline-danger" onclick="service.deleteByIdPerson(${person.id})">Eliminar Usuario</button>
            </div>
          </td>
        `;
        dateble.appendChild(fila);
      });
    } catch (error) {
      console.error("Error renderizando la tabla:", error);
    }
  },

  async recargarTabla() {
    try {
      const data = await this.getAllPerson();
      this.renderTabla(data);
    } catch (error) {
      console.error("Error al refrescar la tabla:", error);
    }
  }
};

document.addEventListener("DOMContentLoaded", async function () {
  await service.recargarTabla();
});
