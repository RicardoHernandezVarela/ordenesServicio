window.addEventListener('load', async e => {

    if('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log(`SW registered`);
        } catch (error) {
            console.log(`SW reg failed`);
            
        }
    }
  });

var newOrdenId = {

};
/********************************************
Obtener fecha
*********************************************/
const fecha = new Date();
const fechaHoy = fecha.getDate().toString() + '/' + (fecha.getMonth() + 1).toString() + '/' + fecha.getFullYear().toString();

/********************************************
Campos del DOM para llenar una orden
*********************************************/
const cliente = document.querySelector('.clt');
const direccion = document.querySelector('.direccion');
const telefono = document.querySelector('.telefono');

const modelo = document.querySelector('.eqp');
const tipo = document.querySelector('.tipo');
const marca = document.querySelector('.marca');

const falla = document.querySelector('.falla');
const servicio = document.querySelector('.serv');
const precio = document.querySelector('.precio');

/********************************************
Opciones para autocompletar datos de orden
*********************************************/
var ordenesEx = {
    data: {
        
      },
      onAutocomplete: function(prop){
          console.log(prop)
      }
}

var clientes = {
    data: {
        
      },
      onAutocomplete: function(prop){
          direccion.value = clientes.data[prop][0];
          telefono.value = clientes.data[prop][1];
      }
}

var equipos = {
    data: {
        
      },
      onAutocomplete: function(prop){
        marca.value = equipos.data[prop][0];
        tipo.value = equipos.data[prop][1];
    }
}

var servicios = {
    data: {
        
      },
      onAutocomplete: function(prop){
        precio.value = servicios.data[prop][0];
    }

}

/********************************************
Inicializar opción de autocompletar
*********************************************/
document.addEventListener('DOMContentLoaded', function() {
    
    var cliente = document.querySelector('.clt');
    var clientInst = M.Autocomplete.init(cliente, clientes);

    var equipo = document.querySelector('.eqp');
    var eqInst = M.Autocomplete.init(equipo, equipos);

    var servicio = document.querySelector('.serv');
    var servInst = M.Autocomplete.init(servicio, servicios);
});
  
/********************************************
 Cargar las colecciones de la base de datos.
*********************************************/
//real-time listener clientes
db.collection('clientes').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
            let cliente = change.doc.data();
            clientes.data[cliente.nombre] = [cliente.direccion, cliente.telefono];
            
        } else if (change.type == 'removed') {
            
        }
    });
});

//real-time listener equipos
db.collection('equipos').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
            let equipo = change.doc.data();
            equipos.data[equipo.modelo] = [equipo.marca, equipo.tipo];
            
        } else if (change.type == 'removed') {
            
        }
    });
});

//real-time listener servicios
db.collection('servicio').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
            let serv = change.doc.data();
            servicios.data[serv.descripcion] = [serv.precio];
            
        } else if (change.type == 'removed') {
            
        }
    });
});


/********************************************
 Crear nueva orden
*********************************************/
const form = document.querySelector('.ordenExistente');
const guardarOrden = document.querySelector('.guardarOrden');

form.addEventListener('submit', evt => {
    evt.preventDefault();

    if (form.clienteInput.value != '' && form.modeloInput.value != '') {
        db.collection('ordenes').add({
            fecha: fechaHoy,

            cliente: form.clienteInput.value, 
            direccion: form.direccionInput.value, 
            telefono: form.telefonoInput.value, 

            modelo: form.modeloInput.value,
            tipo: form.tipoInput.value, 
            marca: form.marcaInput.value,

            numerosserie:  [
                form.nsEquipoInput.value,
                form.nsCargadorInput.value,
                form.nsBateriaInput.value
            ],
            
            falla: form.fallaInput.value, 
            servicio:form.servicioInput.value, 
            precio:form.precioInput.value, 

            entrada: [
                form.partesInput.value,
                form.respaldoInput.value,
                form.obsInput.value
            ],

        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            newOrdenId['id'] = docRef.id
            
            // Store it in the local storage
            localStorage.setItem('id', docRef.id);
            window.location.href = '../pages/buscar.html';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        
        

    } else {
        alert("Incluye la información de la orden!!!")
    }
    
    //form.title.value = '';
    //form.ingredients.value = '';
});

  