// ============================================
// CARRITO DE COMPRAS - Carpas El Fuerte
// ============================================

let carrito = JSON.parse(localStorage.getItem('carritoElFuerte')) || [];

function guardarCarritoLocal() {
  localStorage.setItem('carritoElFuerte', JSON.stringify(carrito));
  actualizarBadge();
}

function actualizarBadge() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.querySelectorAll('.badge-contador').forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}

function agregarAlCarrito(id, nombre, precio, imagen, categoria) {
  const existente = carrito.find(item => item.productoId === id);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ productoId: id, nombre, precio: Number(precio), cantidad: 1, imagen, categoria });
  }
  guardarCarritoLocal();
  renderizarCarrito();
  mostrarCarrito();
  mostrarToast(`✅ "${nombre}" agregado al carrito`);
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.productoId !== id);
  guardarCarritoLocal();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarritoLocal();
  renderizarCarrito();
}

function calcularTotal() {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function renderizarCarrito() {
  const contenedor = document.getElementById('carritoItems');
  const totalEl = document.getElementById('carritoTotal');
  const vacioMsg = document.getElementById('carritoVacio');

  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = '';
    if (vacioMsg) vacioMsg.style.display = 'block';
    if (totalEl) totalEl.innerHTML = '<span>$0</span>';
    return;
  }

  if (vacioMsg) vacioMsg.style.display = 'none';

  contenedor.innerHTML = carrito.map(item => `
    <div class="carrito-item">
      <img src="${item.imagen || 'https://via.placeholder.com/60x60?text=Producto'}" alt="${item.nombre}">
      <div class="carrito-item-info">
        <div class="carrito-item-nombre">${item.nombre}</div>
        <div class="carrito-item-precio">$${(item.precio * item.cantidad).toLocaleString('es-AR')}</div>
        <small class="text-muted">Cant: ${item.cantidad} × $${Number(item.precio).toLocaleString('es-AR')}</small>
      </div>
      <button class="btn-eliminar-item" onclick="eliminarDelCarrito('${item.productoId}')" title="Eliminar">
        <i class="bi bi-trash3"></i>
      </button>
    </div>
  `).join('');

  if (totalEl) {
    totalEl.innerHTML = `Total: <span>$${calcularTotal().toLocaleString('es-AR')}</span>`;
  }
}

function mostrarCarrito() {
  document.getElementById('carritoSidebar')?.classList.add('abierto');
  document.getElementById('overlayCarrito')?.classList.add('visible');
}

function cerrarCarrito() {
  document.getElementById('carritoSidebar')?.classList.remove('abierto');
  document.getElementById('overlayCarrito')?.classList.remove('visible');
}

async function finalizarCompra() {
  if (carrito.length === 0) {
    mostrarToast('⚠️ El carrito está vacío', 'warning');
    return;
  }

  const btnFinalizar = document.getElementById('btnFinalizar');
  if (btnFinalizar) {
    btnFinalizar.disabled = true;
    btnFinalizar.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Procesando...';
  }

  try {
    const response = await fetch('/api/carrito', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: carrito, total: calcularTotal() })
    });

    const data = await response.json();

    if (response.ok) {
      mostrarToast('🎉 ¡Pedido enviado con éxito! Nos contactaremos pronto.', 'success');
      vaciarCarrito();
      cerrarCarrito();
    } else {
      mostrarToast('❌ Error al procesar el pedido: ' + data.message, 'error');
    }
  } catch (error) {
    mostrarToast('❌ Error de conexión. Intenta nuevamente.', 'error');
  } finally {
    if (btnFinalizar) {
      btnFinalizar.disabled = false;
      btnFinalizar.innerHTML = '🛒 Confirmar Pedido';
    }
  }
}

function mostrarToast(mensaje, tipo = 'success') {
  const toast = document.createElement('div');
  const colores = { success: '#2d6a4f', warning: '#e76f51', error: '#dc3545' };
  toast.style.cssText = `
    position:fixed; bottom:20px; right:20px; z-index:99999;
    background:${colores[tipo] || colores.success}; color:white;
    padding:14px 20px; border-radius:12px; font-weight:600;
    max-width:320px; box-shadow:0 6px 20px rgba(0,0,0,0.25);
    animation: slideIn 0.3s ease; font-size:0.95rem;
  `;
  toast.textContent = mensaje;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();
  actualizarBadge();
});
