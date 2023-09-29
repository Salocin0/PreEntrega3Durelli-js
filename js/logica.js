// Array de productos en la tienda
let productos = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: 799.99,
    descripcion: "Portátil de alta gama con pantalla HD y procesador rápido.",
    stock: 20,
    habilitado:1
  },
  {
    id: 2,
    nombre: "Teléfono Samsung Galaxy",
    precio: 499.0,
    descripcion:
      "Smartphone Android con cámara de alta resolución y pantalla AMOLED.",
    stock: 15,
    habilitado:1
  },
  {
    id: 3,
    nombre: "Smart TV LG",
    precio: 599.99,
    descripcion:
      "Televisor inteligente con pantalla 4K y aplicaciones integradas.",
    stock: 10,
    habilitado:1
  },
  {
    id: 4,
    nombre: "Cámara Canon EOS",
    precio: 899.0,
    descripcion:
      "Cámara DSLR con lente intercambiable y grabación de video en Full HD.",
    stock: 8,
    habilitado:1
  },
  {
    id: 5,
    nombre: "Auriculares Sony",
    precio: 149.99,
    descripcion:
      "Auriculares inalámbricos con cancelación de ruido y sonido de alta calidad.",
    stock: 25,
    habilitado:1
  },
  {
    id: 6,
    nombre: "Tableta Samsung Galaxy Tab",
    precio: 299.99,
    descripcion:
      "Tableta Android con pantalla táctil y batería de larga duración.",
    stock: 12,
    habilitado:1
  },
  {
    id: 7,
    nombre: "Refrigeradora Whirlpool",
    precio: 899.0,
    descripcion:
      "Refrigeradora de acero inoxidable con dispensador de agua y hielo.",
    stock: 6,
    habilitado:1
  },
  {
    id: 8,
    nombre: "Impresora Epson",
    precio: 129.95,
    descripcion:
      "Impresora láser a color con conectividad Wi-Fi y escaneo rápido.",
    stock: 18,
    habilitado:1
  },
  {
    id: 9,
    nombre: "Consola de Juegos Xbox",
    precio: 399.99,
    descripcion:
      "Consola de juegos con capacidad 4K y amplia biblioteca de juegos.",
    stock: 14,
    habilitado:1
  },
  {
    id: 10,
    nombre: "Bicicleta de Montaña",
    precio: 499.0,
    descripcion:
      "Bicicleta todoterreno con cuadro de aluminio y suspensiones delanteras.",
    stock: 9,
    habilitado:1
  },
];

//array de productos en carrito
let carrito = [];

let formularioVisible = false;
let carritoVisible = false;

const tbody = document.getElementById("bodyTable");
const mostrarFormularioBtn = document.getElementById("mostrarFormulario");
const formularioContainer = document.getElementById("formulario");
const mostrarTablaCarritoBtn = document.getElementById("mostrarFormCarrito");
const divTablaCarrito = document.getElementById("carrito");
const numeroCarrito = document.getElementById("numeroCarrito");
const buscador = document.getElementById("buscar");
const btnporcentaje = document.getElementById("btnporcentaje");
const inputporcentaje = document.getElementById("inputporcentaje");
const precioMinimo = document.getElementById("precioMinimo");
const precioMaximo = document.getElementById("precioMaximo");
const btnprecio = document.getElementById("btnprecio");
const tbodycart = document.getElementById("bodyTablecart");

// Función para agregar productos al DOM
function agregarProductosAlDOM(arrayProductos) {
  arrayProductos.forEach((producto) => {
    if(producto.habilitado===1){
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>${producto.descripcion}</td>
        <td>${producto.stock}</td>
        <td>
          <button class="btn btn-primary" onclick="agregarProductosACarrito(${producto.id})">
            <i class="bi bi-plus-circle"></i>
          </button>
          <button class="btn btn-danger" onclick="eliminarProducto(${producto.id})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
        `;
      tbody.appendChild(row);
    }
    
  });
}
//funcion para vaciar la tabla
function vaciarTabla() {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}
function vaciarCarrito() {
  while (tbodycart?.firstChild) {
    tbodycart.removeChild(tbodycart.firstChild);
  }
}
//funcion para agregar productos al carrito
function agregarProductosACarrito(productoId,event) {
  const productoEncontrado = productos.find(
    (producto) => producto.id === productoId
  );
  productoEncontrado.stock--;
  if (productoEncontrado.stock === 0) {
    eliminarProducto(productoId);
  }
  const productoExistente = carrito.find(producto => producto.id === productoEncontrado.id);
  if (productoExistente) {
    productoExistente.cantidad++;
    productoExistente.total = productoExistente.cantidad * productoExistente.precio; 
  } else {
    const nuevoProducto = {
      id: productoEncontrado.id,
      nombre: productoEncontrado.nombre,
      precio: productoEncontrado.precio,
      cantidad: 1, 
      total: productoEncontrado.precio 
    };
    carrito.push(nuevoProducto); 
  }
  mostrarToast("Producto agregado al carrito");
  actualizarTabla();
  cantidadEnCarrito(carrito.length);
  actualizarCarrito();
  event?.stopPropagation();
}
function quitarProductosACarrito(productoId,event) {
  const productoEncontrado = productos.find(
    (producto) => producto.id === productoId
  );
  if (productoEncontrado.stock === 0) {
    productoEncontrado.habilitado=1;
  }
  productoEncontrado.stock=productoEncontrado.stock+1;
  
  const productoExistente = carrito.find(producto => producto.id === productoEncontrado.id);
  if (productoExistente) {
    productoExistente.cantidad--;
    productoExistente.total = productoExistente.cantidad * productoExistente.precio; 
    if (productoExistente.cantidad === 0) {
      carrito = carrito.filter((producto) => producto.id !== productoExistente.id);
    }
  }
  mostrarToast("Producto eliminado de carrito");
  actualizarTabla();
  actualizarCarrito();
  event?.stopPropagation();
}
//funcion para eliminar productos
function eliminarProducto(productoId) {
  productoExistente = productos.find((producto) => producto.id === productoId);
  productoExistente.habilitado=0;
  actualizarTabla();
}
function actualizarCarrito() {
  vaciarCarrito();
  cargarProductosEnCarrito();
  cantidadEnCarrito(carrito.length);
}
function eliminarProductoDeCarrito(productoId,event) {
  productoExistente = productos.find((producto) => producto.id === productoId);
  productoCart = carrito.find((producto) => producto.id === productoId);
  productoExistente.habilitado=1;
  productoExistente.stock=productoCart.cantidad+productoExistente.stock;
  carrito = carrito.filter((producto) => producto.id !== productoCart.id);
  actualizarTabla();
  actualizarCarrito();
  event?.stopPropagation();
}

function filtrarProductos(filtro, Min, Max) {
  let productosfiltrados = [];
  if (Max === "") {
    const precios = productos.map((producto) => producto.precio);
    Max = Math.max(...precios);
  }
  if (Min === "") {
    Min = 0;
  }

  productosfiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(filtro.toLowerCase())
  );
  productosfiltrados = productosfiltrados.filter(
    (producto) =>
      producto.precio >= Number(Min) && producto.precio <= Number(Max)
  );

  vaciarTabla();
  agregarProductosAlDOM(productosfiltrados);
}

function aplicarPorcentaje(porcentaje) {
  productos = productos.map((producto) => {
    const precioNuevo = (producto.precio * (1 + porcentaje / 100)).toFixed(2);
    return { ...producto, precio: precioNuevo };
  });

  actualizarTabla();
}

function actualizarTabla() {
  filtrarProductos(buscador.value, precioMinimo.value, precioMaximo.value);
}

function mostrarToast(mensaje) {
  //TODO
}

function borrarCarrito(mensaje,event) {
  carrito=[]
  actualizarCarrito();
  event?.stopPropagation();
  //TODO VOLVER STOCK DE PRODUCTOS
}

window.addEventListener("load", () => {
  agregarProductosAlDOM(productos);
});
buscador.addEventListener("input", () => {
  filtrarProductos(buscador.value, precioMinimo.value, precioMaximo.value);
});
btnporcentaje.addEventListener("click", () => {
  aplicarPorcentaje(inputporcentaje.value);
});
btnprecio.addEventListener("click", () => {
  filtrarProductos(buscador.value, precioMinimo.value, precioMaximo.value);
});

const formAgregarProducto = `
    <form class="container py-3 pb-5" onsubmit="agregarProductosATienda(event)">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" id="nombre" name="nombre" class="form-control">
      </div>
      <div class="mb-3">
        <label for="precio" class="form-label">Precio:</label>
        <input type="number" step="0.01" id="precio" name="precio" class="form-control">
      </div>
      <div class="mb-3">
        <label for="stock" class="form-label">Stock:</label>
        <input type="number" id="stock" name="stock" class="form-control">
      </div>
      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripcion:</label>
        <textarea id="descripcion" name="descripcion" class="form-control" rows="4"></textarea>
      </div>
      <div>
        <button type="submit" class="btn btn-primary align-right">Crear</button>
      </div>
    </form>
`;

mostrarTablaCarritoBtn.addEventListener("click", () => {
  if (carritoVisible) {
    divTablaCarrito.innerHTML = "";
    divTablaCarrito.style.display = "none";
    carritoVisible = false;
  } else if (carrito.length > 0) {
    cargarProductosEnCarrito();    
    carritoVisible = true;
    const divTablaCarritoContainer = divTablaCarrito.querySelector("#tableCart");
    divTablaCarritoContainer.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  } else {
    divTablaCarrito.innerHTML = '<h5 class="text-center pt-1">No hay productos en el carrito</h5>';
    divTablaCarrito.style.display = "block";
    carritoVisible = true;
    const mensajeNoProductos = divTablaCarrito.querySelector('h5');
    mensajeNoProductos.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

function cargarProductosEnCarrito(){
  let tablaCarrito = '<table class="table" id="tableCart">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">Nombre</th>' +
      '<th scope="col">Precio</th>' +
      '<th scope="col">Cantidad</th>' +
      '<th scope="col">Total</th>' +
      '<th scope="col">Acciones</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody id="bodyTablecart">';

    carrito.forEach((producto) => {
      tablaCarrito += `<tr>
        <td>${producto.nombre}</td>
        <td>${Number(producto.precio).toFixed(2)}</td>
        <td>${producto.cantidad}</td>
        <td>${Number(producto.precio * producto.cantidad).toFixed(2)}</td>
        <td>
        <button class="btn btn-primary" data-product-id="${producto.id}" onclick="quitarProductosACarrito(${producto.id},event)">
            <i class="bi bi-dash-circle"></i>
          </button>
          <button class="btn btn-primary" data-product-id="${producto.id}" onclick="agregarProductosACarrito(${producto.id},event)">
            <i class="bi bi-plus-circle"></i>
          </button>
          <button class="btn btn-danger" data-product-id="${producto.id}" onclick="eliminarProductoDeCarrito(${producto.id},event)">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>`;
    });

    tablaCarrito += `</tbody></table>
    <h4>Total: ${Number(totalCarrito()).toFixed(2)}</h4>
      <button class="btn btn-danger" onclick="borrarCarrito(event)">Vaciar carrito</button>
      <button class="btn btn-success" onclick="finalizarCompra()">Finalizar compra</button>`;

      divTablaCarrito.innerHTML = tablaCarrito;
    divTablaCarrito.style.display = "block";
}

function totalCarrito() {
  let total = 0;

  for (const producto of carrito) {
    total += producto.total;
  }

  return total.toFixed(2);
}

window.addEventListener("click", (e) => {
  if (
    !mostrarTablaCarritoBtn.contains(e.target) &&
    e.target !== divTablaCarrito
  ) {
    cerrarFormCarrito();
  }
});

mostrarFormularioBtn.addEventListener("click", () => {
  if (formularioVisible) {
    formularioContainer.innerHTML = "";
    formularioContainer.style.display = "none";
    formularioVisible = false;
  } else {
    formularioContainer.innerHTML = formAgregarProducto;
    formularioContainer.style.display = "block";
    formularioVisible = true;
    const formElement = formularioContainer.querySelector("form");
    formElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});

window.addEventListener("click", (e) => {
  if (
    !mostrarFormularioBtn.contains(e.target) &&
    e.target !== formularioContainer
  ) {
    cerrarFormProducto();
  }
});

function cantidadEnCarrito(nuevaCantidad) {
  if (nuevaCantidad >= 0) {
    numeroCarrito.style.display = "inline-block";
    numeroCarrito.textContent = nuevaCantidad;
  } else {
    numeroCarrito.style.display = "none";
  }
}

//esta funcion agrega un producto nuevo al array de productos
function agregarProductosATienda(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const stock = document.getElementById("stock").value;
  const descripcion = document.getElementById("descripcion").value;

  productos.push({
    id: productos.length + 1,
    nombre: nombre,
    precio: Number(precio),
    stock: Number(stock),
    descripcion: descripcion,
  });

  actualizarTabla();
  cerrarFormProducto();
  mostrarToast("Producto agregado");
}

function cerrarFormProducto() {
  formularioContainer.innerHTML = "";
  formularioContainer.style.display = "none";
  formularioVisible = false;
}

function cerrarFormCarrito() {
  divTablaCarrito.innerHTML = "";
  divTablaCarrito.style.display = "none";
  carritoVisible = false;
}
