const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const fs = require('fs');
const path = require('path');

const obtenerTodosLosUsuarios = async () => {
    return await Usuario.findAll({ order: [['id', 'ASC']]});
};

const crearUsuario = async (nombre, apellido, correo, telefono, contrasena, rol) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10);//encriptar contraseña

    return await Usuario.create({nombre, apellido, correo, contrasena: hashedPassword, telefono, rol});
};

const actualizarUsuario = async (correo, datos) => {
    const usuario = await Usuario.findOne({ where: { correo }});
    if (!usuario) return null;

    usuario.nombre = datos.nombre;
    usuario.apellido = datos.apellido;
    usuario.telefono = datos.telefono;
    usuario.rol = datos.rol;

    if(datos.contrasena) {
        const hashedPassword = await bcrypt.hash(datos.contrasena, 10);
        usuario.contrasena = hashedPassword;
    }

    return await usuario.save();
};

const obtenerUsuarioPorCorreo = async (correo) => {
    return await Usuario.findOne({ where: { correo }});
};

const obtenerUsuarioPorId = async (id) => {
  return await Usuario.findByPk(id);
}

const eliminarUsuarioCorreo = async (correo) => {
    const usuario = await Usuario.findOne({ where: { correo }});
    if (usuario) {
    return await usuario.destroy();
    }
    return null;
};

const eliminarUsuarioId = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (usuario) {
    return await usuario.destroy();
  }
  return null;
};

module.exports ={
    obtenerTodosLosUsuarios,
    crearUsuario,
    actualizarUsuario,
    obtenerUsuarioPorCorreo,
    obtenerUsuarioPorId,
    eliminarUsuarioCorreo,
    eliminarUsuarioId
};