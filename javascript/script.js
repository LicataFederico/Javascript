// //////////////////////variables//////////////////////

let divProductos = document.getElementById('divProductos');
let botonEliminar = document.getElementById(`eliminar${element.id}`)
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
const contenedorCarrito = document.getElementById('contenedor-carrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const alertaFinalizar = document.getElementById('alertaFinalizar');
const toastLiveExample = document.getElementById("liveToast")


// insertan cards de boostrap al DOM.se asignan las propiedades y se crea un boton para cada card.Los valores se importan de archivo json,el cual sirve de stock
fetch('stock.json')
    .then(promise => promise.json())
    .then(data => {
        data.forEach(element => {
            divProductos.innerHTML += `
        <div class="card d-flex justify-content-around m-2" id="producto${element.id} "style="width: 18rem; margin:6px">
            <img src="./img/img${element.id}.jpg" class="card-img-top" alt="...">
            <div class="card-body ">
                <h5>${element.nombre}</h5>
                <p class="card-text" >$${element.precio}</p>
                <button  class="btn btn-primary  botonAgregar${element.id}"  id="botonAgregar${element.id}"><i class="fas fa-cart-plus "></i></button>
            </div>
        </div>
        `
        });
        //////////////////////funcionalidad de cada boton para agregar al carrito//////////////////////
        data.forEach(element => {
            document.getElementById(`botonAgregar${element.id}`).addEventListener('click', () => {
                if (arrayCarrito.find(elemento => elemento.id == element.id)) {
                    let index = arrayCarrito.findIndex(elemento => elemento.id == element.id)
                    if (arrayCarrito[index].cantidad < element.stock) {
                    }
                    arrayCarrito[index].cantidad++;

                } else {
                    let producto = new Producto(element.id, element.nombre, element.color, element.precio, element.stock)
                    arrayCarrito.push(producto)
                }
                mostrarToast()
                mostrarCarrito()
                actualizarCarrito()
                localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
            })
        })
    })

// //////////////////////funcion que muestra un toast de boostrap con un mensaje al agregar productos al carrito//////////////////////
function mostrarToast() {
    var toast = new bootstrap.Toast(toastLiveExample, {
        animation: true,
        autohide: true,
        delay: 1500
    })
    toast.show()
    console.log("click en toast activado")
}
