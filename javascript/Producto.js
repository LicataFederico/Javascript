class Producto {
    constructor(id, nombre, color, precio, stock, cantidad, img) {
        this.id = id;
        this.nombre = nombre;
        this.color = color;
        this.precio = precio;
        this.stock = stock
        this.cantidad = cantidad
        this.img = img
        this.cantidad = 1;
    }
}

let arrayCarrito = []

if (!localStorage.getItem('carrito')) {
    localStorage.setItem('carrito', JSON.stringify([]))
}


