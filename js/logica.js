// Array de productos en la tienda
let productos = [
  {
    id: 1,
    nombre: "Laptop HP",
    precio: "$799.99",
    descripcion: "Portátil de alta gama con pantalla HD y procesador rápido.",
    stock: 20,
  },
  {
    id: 2,
    nombre: "Teléfono Samsung Galaxy",
    precio: "$499.00",
    descripcion:
      "Smartphone Android con cámara de alta resolución y pantalla AMOLED.",
    stock: 15,
  },
  {
    id: 3,
    nombre: "Smart TV LG",
    precio: "$599.99",
    descripcion:
      "Televisor inteligente con pantalla 4K y aplicaciones integradas.",
    stock: 10,
  },
  {
    id: 4,
    nombre: "Cámara Canon EOS",
    precio: "$899.00",
    descripcion:
      "Cámara DSLR con lente intercambiable y grabación de video en Full HD.",
    stock: 8,
  },
  {
    id: 5,
    nombre: "Auriculares Sony",
    precio: "$149.99",
    descripcion:
      "Auriculares inalámbricos con cancelación de ruido y sonido de alta calidad.",
    stock: 25,
  },
  {
    id: 6,
    nombre: "Tableta Samsung Galaxy Tab",
    precio: "$299.99",
    descripcion:
      "Tableta Android con pantalla táctil y batería de larga duración.",
    stock: 12,
  },
  {
    id: 7,
    nombre: "Refrigeradora Whirlpool",
    precio: "$899.00",
    descripcion:
      "Refrigeradora de acero inoxidable con dispensador de agua y hielo.",
    stock: 6,
  },
  {
    id: 8,
    nombre: "Impresora Epson",
    precio: "$129.95",
    descripcion:
      "Impresora láser a color con conectividad Wi-Fi y escaneo rápido.",
    stock: 18,
  },
  {
    id: 9,
    nombre: "Consola de Juegos Xbox",
    precio: "$399.99",
    descripcion:
      "Consola de juegos con capacidad 4K y amplia biblioteca de juegos.",
    stock: 14,
  },
  {
    id: 10,
    nombre: "Bicicleta de Montaña",
    precio: "$499.00",
    descripcion:
      "Bicicleta todoterreno con cuadro de aluminio y suspensiones delanteras.",
    stock: 9,
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

// Función para agregar productos al DOM
function agregarProductosAlDOM() {
  productos.forEach((producto) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.precio}</td>
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
  });
}
//funcion para vaciar la tabla
function vaciarTabla() {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}
//funcion para agregar productos al carrito
function agregarProductosACarrito(productoId) {
  const productoEncontrado = productos.find(
    (producto) => producto.id === productoId
  );
  productoEncontrado.stock--;
  if (productoEncontrado.stock === 0) {
    eliminarProducto(productoId);
  }
  carrito.push(productoEncontrado);
  mostrarToast("Producto agregado al carrito");
  vaciarTabla();
  agregarProductosAlDOM();
  cantidadEnCarrito(carrito.length);
}
//funcion para eliminar productos
function eliminarProducto(productoId) {
  productos = productos.filter((producto) => producto.id !== productoId);
  vaciarTabla();
  agregarProductosAlDOM();
}

function mostrarToast(mensaje) {}

window.addEventListener("load", agregarProductosAlDOM);

const formAgregarProducto = `
    <form class="container py-3 pb-5" onsubmit="agregarProductosATienda(event)">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre:</label>
        <input type="text" id="nombre" name="nombre" class="form-control">
      </div>
      <div class="mb-3">
        <label for="precio" class="form-label">Precio:</label>
        <input type="number" id="precio" name="precio" class="form-control">
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

const tablaCarrito = 
carrito.forEach((producto) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.precio}</td>
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
});

mostrarTablaCarritoBtn.addEventListener("click", () => {
  if (formularioVisible) {
    divTablaCarrito.innerHTML = "";
    divTablaCarrito.style.display = "none";
    carritoVisible = false;
  } else if(carrito.length>0) {
    divTablaCarrito.innerHTML = `<table class="table">
    <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Stock</th>
            <th scope="col">Acciones</th>
        </tr>
    </thead>
    <tbody id="bodyTable">
    </tbody>
</table>`;
    divTablaCarrito.style.display = "block";
    carritoVisible = true;
    const carritoElement = divTablaCarrito.querySelector("form");
    carritoElement.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }else{
    divTablaCarrito.innerHTML = `<h5>Carrito vacio</h5>`;
    divTablaCarrito.style.display = "block";
    carritoVisible = true;
  }
});

window.addEventListener("click", (e) => {
  if (
    !mostrarTablaCarritoBtn.contains(e.target) &&
    e.target !== divTablaCarrito
  ) {
    cerrarFormCarrito()
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
    cerrarFormProducto()
  }
});

function cantidadEnCarrito(nuevaCantidad) {
  if (nuevaCantidad > 0) {
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

  productos.push({ id: productos.length + 1, nombre: nombre, precio: precio, stock: stock, descripcion: descripcion });

  vaciarTabla();
  agregarProductosAlDOM();
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

/*

//esta funcion muestra los productos cargados en la tienda y permite agregar un producto al carrito
function agregarProductosACarrito() {

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
    const nombreBuscado = prompt(
      "Ingrese parte del nombre del producto a buscar:"
    );
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

      const seguirBuscando = prompt(
        "¿Quiere buscar otro producto? (1 para sí, 0 para no)"
      );
      if (seguirBuscando !== "1") {
        continuarBuscando = false;
      }
    }

    const continuarOpcion = prompt(
      "¿Quiere seguir buscando productos por nombre? (1 para sí, 0 para no)"
    );
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

/*let accion = "";
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
}*/
