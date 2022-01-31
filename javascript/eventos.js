/// Se agrega el modal de boostrap del carrito al contenedor,especificamente al card-body con el id "contenedorCarrito",en este se visualizaran las distinas propiedades pertenecientes a la clase Productos
function mostrarCarrito() {
    contenedorCarrito.innerHTML = '';
    arrayCarrito.forEach(element => {
        let div = document.createElement('div')
        div.innerHTML += `
        <div class='card-modal'>
            <img src="./img/img${element.id}.jpg" width='50px'>
            <h5 class="card-title">${element.nombre}</h5>
            <p id="cantidad${element.id}">cantidad: ${element.cantidad}</p>
            <p class="card-text">x          $${element.precio}</p>
            <button id="eliminar${element.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>
        `
        contenedorCarrito.appendChild(div)

        /// esta variable no pude ponerla en el script con el resto porque sino no se rompia el codigo
        let botonEliminar = document.getElementById(`eliminar${element.id}`)
        /// funcionalidad del boton eliminar : siempre y cuando haya mas de un elemento en arrayCarrito,se podra eliminar de uno en uno),de lo contrario se vaciara el array.
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
    })
}

// funcion acumuladora para mostrar precio final dentro del modal
function actualizarCarrito() {
    precioTotal.innerText = arrayCarrito.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    contadorCarrito.innerText = arrayCarrito.reduce((acc, el) => acc + el.cantidad, 0);
}

// boton finalizarCompra   no em anda el if para confirmar que tiene mas elementos en el carrito.
botonFinalizarCompra.addEventListener('click', () => {
    if (arrayCarrito.length == 0) {
        document.getElementById('alertaFinalizar').innerHTML = `
        <h1 class="card-title" style="font-size: 18px;">Your cart is empty. Please select an item.</h1>`
        return;
    }
    arrayCarrito.pop();
    document.getElementById('alertaFinalizar').innerHTML = `
    <h1 class="card-title" style="font-size: 18px;">Thanks for buying in Pandora Store!</h1>
    `
    clearArray()
})

// funcion para borrar los elementos del array,se que hay metodos mas rapidos que recorrer el array borrando de uno con .pop, pero no logre hacerlo andar mas que con este metodo
function clearArray() {
    contenedorCarrito.innerHTML = '';
    while (arrayCarrito.length > 0) {
        arrayCarrito.pop();
    }
    actualizarCarrito()
    return arrayCarrito;
}
