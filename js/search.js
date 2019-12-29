const ordenes = document.querySelector('.ordenes')
document.addEventListener('DOMContentLoaded', function() {
  //nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});

});
/********************************************
Campos del DOM para llenar una orden
*********************************************/
const form = document.querySelector('.ordenImp');
// Get it from the local storage
var id = localStorage.getItem('id');
console.log(id);
form.idInput.value = id;
/********************************************
Opciones para autocompletar datos de orden
*********************************************/
var ordenesEx = {
  data: {
      
    },
    onAutocomplete: function(prop){
      //form.idInput.value = prop;
      form.fechaInput.value = ordenesEx.data[prop].fecha;
      form.clienteInput.value = ordenesEx.data[prop].cliente;
      form.direccionInput.value = ordenesEx.data[prop].direccion;
      form.telefonoInput.value = ordenesEx.data[prop].telefono;

      form.modeloInput.value = ordenesEx.data[prop].modelo;
      form.tipoInput.value = ordenesEx.data[prop].tipo;
      form.marcaInput.value = ordenesEx.data[prop].marca;

      form.nsEquipoInput.value = ordenesEx.data[prop].numerosserie[0];
      form.nsCargadorInput.value = ordenesEx.data[prop].numerosserie[1];
      form.nsBateriaInput.value = ordenesEx.data[prop].numerosserie[2];

      form.fallaInput.value = ordenesEx.data[prop].falla;
      form.servicioInput.value = ordenesEx.data[prop].servicio;
      form.precioInput.value = ordenesEx.data[prop].precio;

      form.partesInput.value = ordenesEx.data[prop].entrada[0];
      form.respaldoInput.value = ordenesEx.data[prop].entrada[1];
      form.obsInput.value = ordenesEx.data[prop].entrada[2];
    }
}

/********************************************
Inicializar opción de autocompletar
*********************************************/
document.addEventListener('DOMContentLoaded', function() {

  var ordenEx = document.querySelector('.getOrden');
  var ordInst = M.Autocomplete.init(ordenEx, ordenesEx);
  
});

/********************************************
 Cargar las colecciones de la base de datos.
*********************************************/
//real-time listener ordenes
db.collection('ordenes').onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(change => {
      if(change.type == 'added') {
          let ord = change.doc.data();
          ordenesEx.data[change.doc.id] = ord;
          
      } else if (change.type == 'removed') {
          
      }
  });
});
