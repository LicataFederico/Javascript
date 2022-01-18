let divProductos = document.getElementById('divProductos')

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
                <button  class="btn btn-danger "  id="botonAgregar${element.id}"><i class="fas fa-cart-plus "></i></button>
            </div>
        </div>
        `
        });
        data.forEach(element => {
            document.getElementById(`botonAgregar${element.id}`).addEventListener('click', () => {
                if (arrayCarrito.find(elemento => elemento.id == element.id)) {
                    let index = arrayCarrito.findIndex(elemento => elemento.id == element.id)
                    if (arrayCarrito[index].cantidad < element.stock) {

                    }
                    arrayCarrito[index].cantidad++;
                    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
                    mostrarCarrito()
                    actualizarCarrito()

                } else {
                    let producto = new Producto(element.id, element.nombre, element.color, element.precio, element.stock)
                    arrayCarrito.push(producto)
                    mostrarCarrito()
                    actualizarCarrito()
                    localStorage.setItem('carrito', JSON.stringify(arrayCarrito))
                }
            })
        })
    })