const contenedorCarrito = document.getElementById('contenedor-carrito');
const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const alertaFinalizar = document.getElementById('alertaFinalizar');

function mostrarCarrito() {
    contenedorCarrito.innerHTML = '';
    arrayCarrito.forEach(element => {
        let div = document.createElement('div')
        div.innerHTML += `
        <div class='card-modal'>
            <img src="./img/img${element.id}.jpg" width='50px'>
            <h5 class="card-title">${element.nombre}</h5>
            <p id="cantidad${element.id}">cantidad: ${element.cantidad}</p>
            <p class="card-text">$${element.precio}</p>
            <button id="eliminar${element.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>
        `
        contenedorCarrito.appendChild(div)


        let botonEliminar = document.getElementById(`eliminar${element.id}`)


        botonEliminar.addEventListener('click', () => {
            if (element.cantidad > 1) {
                element.cantidad = element.cantidad - 1
                document.getElementById(`cantidad${element.id}`).innerHTML = `<p id="cantidad${element.id}">cantidad: ${element.cantidad}</p>`
                localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
                actualizarCarrito()

            } else {
                botonEliminar.parentElement.remove()
                arrayCarrito = arrayCarrito.filter(prodE => prodE.id != element.id)
                localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
                actualizarCarrito()

            }
        })
        // modal finalizarCompra
        let botonFinalizarCompra = document.getElementById(`finalizarCompra`)

        botonFinalizarCompra.addEventListener('click', () => {
            alertaFinalizar.innerHTML = `

            <h1 class="card-title">Thanks for buying in Pandora Store!</h1>
            <p>Total:$</p>

            `
            alertaFinalizar.appendChild()
        })
    })
}
// funcion acumuladora para mostrar precio final dentro del modal
function actualizarCarrito() {
    precioTotal.innerText = arrayCarrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    contadorCarrito.innerText = arrayCarrito.reduce((acc, el) => acc + el.cantidad, 0);
}









