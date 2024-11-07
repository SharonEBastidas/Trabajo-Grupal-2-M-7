const Categoria = require('../models/Categoria');

const obtenerTodasLasCategorias = async () => {
  return await Categoria.findAll();
};

const obtenerCategoriaPorNombre = async (nombre) => {
  return await Categoria.findOne({ where: { nombre }});
};

const obtenerCategoriaPorId = async (id) => {
  return await Categoria.findByPk(id);
};


const crearCategoria = async (datos) => {
  return await Categoria.create(datos);
};

const actualizarCategoria = async (id, datos) => {
  // const categoria = await Categoria.findOne({ where: { nombre }});
    
  // if (!categoria) return null;
  
  // categoria.nombre = datos.nombre;
  // categoria.descripcion = datos.descripcion;

  // return await categoria.save();
  const producto = await Categoria.findByPk(id);
  if (producto) {
    return await producto.update(datos);
  }
  return null;
};

const eliminarCategoria = async (id) => {
  const categoria = await Categoria.findByPk(id);
  if (categoria) {
    return await categoria.destroy();
  }
  return null;
};

module.exports = {
    obtenerTodasLasCategorias,
    obtenerCategoriaPorNombre,
    obtenerCategoriaPorId,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
};
