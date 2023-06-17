const socket = io();

socket.on('productosActualizados', (productos) => {
    const productList = document.getElementById('productList');
  
    // Eliminar todos los elementos existentes
    while (productList.firstChild) {
      productList.removeChild(productList.firstChild);
    }
  
    // Agregar los nuevos productos a la lista
    productos.forEach((producto) => {
      const li = document.createElement('li');
      const h2 = document.createElement('h2');
      const pPrice = document.createElement('p');
      const pDescription = document.createElement('p');
      const pId = document.createElement('p');
  
      h2.textContent = producto.title;
      pPrice.textContent = `Precio: $${producto.price}`;
      pDescription.textContent = `Descripción: ${producto.description}`;
      pId.textContent = `ID: ${producto.id}`;
  
      li.appendChild(h2);
      li.appendChild(pPrice);
      li.appendChild(pDescription);
      li.appendChild(pId);
      productList.appendChild(li);
    });
  });
  