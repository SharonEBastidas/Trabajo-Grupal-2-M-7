const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para listar los usuarios
router.get('/', usuarioController.getUserList);

// Ruta para mostrar el formulario de agregar usuario
router.get('/add', usuarioController.getAddUsuarioForm);

// Ruta para agregar un nuevo usuario
router.post('/add', usuarioController.addUsuario);

// Ruta para mostrar el formulario de consulta de usuario
router.get('/consult', usuarioController.getConsultShowUsuarioForm);

// Ruta para consultar un usuario
router.post('/consult', usuarioController.showUsuario);

// Ruta para obtener el formulario de consulta de edición de usuario
router.get('/edit', usuarioController.getConsultEditUsuarioForm);

// Ruta para mostrar el formulario de edición de usuario
router.post('/edit', usuarioController.getEditUsuarioForm);

// Ruta para editar un usuario desde la lista
router.post('/:id/edit', usuarioController.getEditUsuarioForm);

// Ruta para editar un usuario
router.post('/edit/:id', usuarioController.editUsuario);

// Ruta para mostrar el formulario de eliminación de usuario
router.get('/delete', usuarioController.getConsultDeleteUsuarioForm);

// Ruta para eliminar un usuario
router.post('/delete/:correo', usuarioController.deleteUsuarioForm);

// Ruta para eliminar un usuario desde la lista
router.post('/:id/delete', usuarioController.deleteUsuario)

module.exports = router;
