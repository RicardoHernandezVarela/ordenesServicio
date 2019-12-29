const ordenes = document.querySelector('.ordenes')
document.addEventListener('DOMContentLoaded', function() {
  //nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});

});

// render orden data
const renderOrden = (data, id) => {
  const html = `
    <div class="card-panel orden white row" data-id=${id}>
      <img src="./img/lm.jpeg" alt="recipe thumb">
      <div class="orden-details">
        <div class="orden-title">${data.cliente}</div>
        <div class="orden-info">${data.modelo} <span>${data.tipo}</span></div>
        <div class="orden-info">${data.fecha}</div>
      </div>
      <div class="orden-delete">
        <i class="material-icons" data-id=${id}>delete_outline</i>
      </div>
    </div>
  `;

  ordenes.innerHTML += html;
};

// remove recipe from DOM 
const removeOrden = (id) => {
  const orden = document.querySelector(`.orden[data-id=${id}]`);
  orden.remove();
}

//return ID
const returnID = (vari, id) => {
  vari = id;
}


// render form data
const renderInfo = (id) => {
  const html = `
    <div class="container grey-text" data-id=${id}>
    <form class="ordenImp container section">
      <h6 >Nueva orden</h6>
      <div class="divider"></div>

      <!-- CLIENTE INFO -->
      <div class="conctentInfo">
          <div class="input-field exField">
              <input placeholder="e.g. Juan López" type="text" id="clienteInput" class="clt inpEx">
              <label for="clienteInput">Cliente</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. calle # Colonia" type="text" id="direccionInput" class="direccion inpEx">
              <label for="direccionInput">Direccion</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. 771" type="text" id="telefonoInput" class="telefono inpEx">
              <label for="telefonoInput">Telefono</label>
          </div>
      </div>

      <!-- EQUIPO INFO -->
      <div class="conctentInfo">
          <div class="input-field exField">
              <input placeholder="e.g. A1278" type="text" id="modeloInput" class="eqp modelo">
              <label for="modeloInput">Modelo</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. MAC" type="text" id="tipoInput" class="tipo">
              <label for="tipoInput">Tipo</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. APPLE" type="text" id="marcaInput" class="marca">
              <label for="marcaInput">Marca</label>
          </div>
      </div>

      <!-- NUMEROS DE SERIE -->
      <div class="conctentInfo">
          <div class="input-field exField">
              <input placeholder="e.g. 123" type="text" id="nsEquipoInput" class="equipoNS">
              <label for="modeloInput">N.S. Equipo</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. 456" type="text" id="nsCargadorInput" class="cargadorNS">
              <label for="tipoInput">N.S. Cargador</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. 789" type="text" id="nsBateriaInput" class="bateriaNS">
              <label for="marcaInput">N.S. Batería</label>
          </div>
      </div>

      <!-- SERVICIO INFO -->
      <div class="conctentInfo">
          <div class="input-field exField">
              <input placeholder="e.g. SISTEMA" type="text" id="fallaInput" class="falla">
              <label for="fallaInput">Falla</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. INST.SOFT." type="text" id="servicioInput" class="serv">
              <label for="servicioInput">Servicio</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. $$$" type="text" id="precioInput" class="precio">
              <label for="precioInput">Precio</label>
          </div>
      </div>

      <!-- ENTRADA INFO -->
      <div class="conctentInfo">
          <div class="input-field exField">
              <input placeholder="e.g. TOUCH" type="text" id="partesInput" class="partes">
              <label for="fallaInput">Partes dañadas</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. MAX 100GB" type="text" id="respaldoInput" class="respaldo">
              <label for="servicioInput">Respaldo</label>
          </div>
          <div class="input-field exField">
              <input placeholder="e.g. Observaciones" type="text" id="obsInput" class="observaciones">
              <label for="precioInput">Observaciones</label>
          </div>
      </div>

    </form>
    <div class="center">
      <a class="btn-floating btn-small btn-large">
        <i class="material-icons" onclick="window.print()">print</i>
      </a>
    </div>
  </div>
  `;

  ordenes.innerHTML += html;
};