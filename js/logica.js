//productos cargados por defecto
const productos = [
  { id: 1, nombre: "producto 1", precio: 250 },
  { id: 2, nombre: "producto 2", precio: 500 },
  { id: 3, nombre: "producto 3", precio: 750 },
];
const carrito = [];
//esta funcion agrega un producto nuevo al array de productos
function agregarProductosATienda() {
  let respAgr = prompt("¿Desea agregar productos? 1 Si, 0 No");

  while (respAgr != "0") {
    const nombre = prompt("Nombre del producto");
    const precio = parseFloat(prompt("Precio del producto"));

    if (!isNaN(precio)) {
      productos.push({
        id: productos.length + 1,
        nombre: nombre,
        precio: precio,
      });
    } else {
      alert("Precio no válido. El producto no se agregó.");
    }

    respAgr = prompt("¿Desea agregar otro? 1 Si, 0 No");
  }
}
//esta funcion muestra los productos cargados en la tienda y permite agregar un producto al carrito
function agregarProductosACarrito() {
  let prodAAgregar = prompt("¿Desea agregar productos al carrito? 1 Si, 0 No");

  while (prodAAgregar != "0") {
    let textProductos = "";
    for (const producto of productos) {
      textProductos += `codigo:${producto.id} producto: ${producto.nombre} precio:${producto.precio}\n`;
    }
    prodAAgregar = prompt(
      textProductos +
        "Ingrese el número del producto a agregar en el carrito, 0 para dejar de agregar"
    );
    prodAAgregar = parseInt(prodAAgregar);

    if (
      !isNaN(prodAAgregar) &&
      prodAAgregar >= 0 &&
      prodAAgregar <= productos.length
    ) {
      if (prodAAgregar > 0) {
        carrito.push(productos[prodAAgregar - 1]);
        alert("Producto agregado al carrito.");
      }
    } else {
      alert("Número de producto no válido.");
    }
  }
}
//finaliza el proceso de compra y muestra los productos comprados
function comprarProductosEnCarrito() {
  let total = 0;
  let textProductos = "Productos en el carrito:\n";

  for (const producto of carrito) {
    textProductos += `codigo:${producto.id + 1} producto: ${
      producto.nombre
    } precio:${producto.precio}\n`;
    total += producto.precio;
  }

  alert(textProductos);
  alert(`Total a pagar: $${total.toFixed(2)}`);
  carrito = [];
}
//permite ver los productos que se agregaron en el carrito
function verCarrito() {
  let cart = "Productos en el carrito:\n";

  for (const producto of carrito) {
    cart += `num:${producto.id + 1} producto: ${producto.nombre} precio:${
      producto.precio
    }\n`;
  }

  alert(cart);
}

// Función para buscar un producto por nombre en la tienda
// Función para buscar productos por nombre (similitud) en la tienda
function buscarPorNombre() {
  let continuarBuscando = true;

  while (continuarBuscando) {
    const nombreBuscado = prompt("Ingrese parte del nombre del producto a buscar:");
    const productosEncontrados = [];

    for (const producto of productos) {
      if (producto.nombre.toLowerCase().includes(nombreBuscado.toLowerCase())) {
        productosEncontrados.push(producto);
      }
    }

    if (productosEncontrados.length > 0) {
      let resultado = "Productos encontrados:\n";
      for (const producto of productosEncontrados) {
        resultado += `Codigo: ${producto.id} Producto: ${producto.nombre} Precio: $${producto.precio}\n`;
      }
      alert(resultado);
    } else {
      alert("No se encontraron productos.");

      const seguirBuscando = prompt("¿Quiere buscar otro producto? (1 para sí, 0 para no)");
      if (seguirBuscando !== "1") {
        continuarBuscando = false;
      }
    }

    const continuarOpcion = prompt("¿Quiere seguir buscando productos por nombre? (1 para sí, 0 para no)");
    if (continuarOpcion !== "1") {
      continuarBuscando = false;
    }
  }
}

// Función para buscar productos con precio menor a un valor dado
function buscarPorPrecioMenor() {
  const precioMaximo = parseFloat(prompt("Ingrese el precio máximo:"));
  const productosEncontrados = [];

  if (!isNaN(precioMaximo)) {
    for (const producto of productos) {
      if (producto.precio <= precioMaximo) {
        productosEncontrados.push(producto);
      }
    }

    if (productosEncontrados.length > 0) {
      let resultado = "Productos encontrados:\n";
      for (const producto of productosEncontrados) {
        resultado += `Codigo: ${producto.id} Producto: ${producto.nombre} Precio: $${producto.precio}\n`;
      }
      alert(resultado);
    } else {
      alert("No se encontraron productos con precio menor a " + precioMaximo);
    }
  } else {
    alert("Precio máximo no válido.");
  }
}

// Función para buscar productos con precio mayor a un valor dado
function buscarPorPrecioMayor() {
  const precioMinimo = parseFloat(prompt("Ingrese el precio mínimo:"));
  const productosEncontrados = [];

  if (!isNaN(precioMinimo)) {
    for (const producto of productos) {
      if (producto.precio >= precioMinimo) {
        productosEncontrados.push(producto);
      }
    }

    if (productosEncontrados.length > 0) {
      let resultado = "Productos encontrados:\n";
      for (const producto of productosEncontrados) {
        resultado += `Codigo: ${producto.id} Producto: ${producto.nombre} Precio: $${producto.precio}\n`;
      }
      alert(resultado);
    } else {
      alert("No se encontraron productos con precio mayor a " + precioMinimo);
    }
  } else {
    alert("Precio mínimo no válido.");
  }
}

// Función para aplicar un aumento a todos los productos en la tienda
function aplicarAumento() {
  const aumentoPorcentaje = parseFloat(
    prompt("Ingrese el porcentaje de aumento:")
  );

  if (!isNaN(aumentoPorcentaje)) {
    for (const producto of productos) {
      producto.precio += (producto.precio * aumentoPorcentaje) / 100;
    }
    alert("Aumento aplicado a todos los productos en la tienda.");
  } else {
    alert("Porcentaje de aumento no válido.");
  }
}

let accion = "";
//bucle del menu principal
while (accion != "9") {
  accion = prompt(
    `¿Qué desea hacer?
     1 => Agregar productos a la tienda
     2 => Agregar productos al carrito
     3 => Comprar productos en el carrito
     4 => Ver carrito
     5 => Buscar producto por nombre
     6 => Buscar productos con precio menor a...
     7 => Buscar productos con precio mayor a...
     8 => Aplicar aumento a productos
     9 => Salir`
  );
  switch (accion) {
    case "1":
      agregarProductosATienda();
      break;
    case "2":
      agregarProductosACarrito();
      break;
    case "3":
      comprarProductosEnCarrito();
      break;
    case "4":
      verCarrito();
      break;
    case "5":
      buscarPorNombre();
      break;
    case "6":
      buscarPorPrecioMenor();
      break;
    case "7":
      buscarPorPrecioMayor();
      break;
    case "8":
      aplicarAumento();
      break;
    case "9":
      alert("Gracias por su compra");
      break;
    default:
      alert("Opción incorrecta");
      break;
  }
}
