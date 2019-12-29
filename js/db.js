// enable offline data

db.enablePersistence()
  .catch(function(err) {
    if (err.code == 'failed-precondition') {
      // probably multible tabs open at once
      console.log('persistance failed');
    } else if (err.code == 'unimplemented') {
      // lack of browser support for the feature
      console.log('persistance not available');
    }
  });

//real-time listener
console.log('hola db');
db.collection('ordenes').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        if(change.type == 'added') {
            renderOrden(change.doc.data(), change.doc.id);
        } else if (change.type == 'removed') {
            removeOrden(change.doc.id);
        }
    })
})

//delete order
const ordenesContainer = document.querySelector('.ordenes');
ordenesContainer.addEventListener('click', evt => {
  if(evt.target.tagName === 'I'){
    const id = evt.target.getAttribute('data-id');
    db.collection('ordenes').doc(id).delete();

  }
})