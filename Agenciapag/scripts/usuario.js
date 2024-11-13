const host = "http://localhost:8080/";

const service = {
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
      console.error("Este fue el error llamando el servicio de guardar persona", error);
    }
  }
};


document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registroForm");

    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      
      async function recogerPersonData() {
        const data = {
          id: document.getElementById('inputId').value,
          nombre: document.getElementById('inputNombre').value,
          apellido: document.getElementById('inputApellido').value,
          fechaNacimiento: document.getElementById('inputFechaNacimiento').value,
          lugarNacimiento: document.getElementById('inputLugarNacimiento').value,
          estadoSistema: document.getElementById('inputEstadoSistema')?.value
        };

        const response = await service.savePerson(data);
        if (response) {
          alert("Usuario registrado con éxito");
          form.reset();
          window.location.href="BaseDatosUsuarios.html"
        } else {
          alert("Error al registrar el usuario");
        }
      }

      await recogerPersonData();
    });
  
});
