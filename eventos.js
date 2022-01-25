/// Se agrega el modal de boostrap del carrito al contenedor,especificamente al card-body con el id "contenedorCarrito"
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
        /// funcionalidad del boton eliminar y se agrega la cantidad
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

/// boton filanizar compra comiteado en github

// boton finalizarCompra   no em anda el if para confirmar que tiene mas elementos en el carrito.

botonFinalizarCompra.addEventListener('click', () => {
    console.log("click")
    if (arrayCarrito.length == 0) {
        console.log("array vacio ingrese elementos |dentro del else if")
        document.getElementById('alertaFinalizar').innerHTML = `
        <h1 class="card-title" style="font-size: 18px;">Your cart is empty. Please select an item.</h1>
        
    
        `

        return;
    }
    console.log("click |dentro del if")
    arrayCarrito.pop();
    document.getElementById('alertaFinalizar').innerHTML = `
    <h1 class="card-title" style="font-size: 18px;">Thanks for buying in Pandora Store!</h1>
    
    `
    actualizarCarrito()
    clearArray()

})

function clearArray() {
    contenedorCarrito.innerHTML = '';
    while (arrayCarrito.length > 0) {
        arrayCarrito.pop();
    }
    actualizarCarrito()
    return arrayCarrito;

}
