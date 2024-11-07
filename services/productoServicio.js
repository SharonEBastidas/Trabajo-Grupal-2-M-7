const Producto = require('../models/Producto');

const obtenerTodosLosProductos = async () => {
  return await Producto.findAll();
};

const obtenerProductoPorId = async (id) => {
  return await Producto.findByPk(id);
};

const crearProducto = async (datos) => {
  return await Producto.create(datos);
};

const actualizarProducto = async (id, datos) => {
  const producto = await Producto.findByPk(id);
  if (producto) {
    return await producto.update(datos);
  }
  return null;
};

const eliminarProducto = async (id) => {
  const producto = await Producto.findByPk(id);
  if (producto) {
    return await producto.destroy();
  }
  return null;
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
