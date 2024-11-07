const usuarioService = require("../services/usuarioService");
const Usuario = require('../models/Usuario');

const title = "Ecommerce";
const url = "usuarios";
const ruta = "Usuarios";

// Consultar usuario registrados
const getUserList = async (req, res) => {
    try {
        const datos = await usuarioService.obtenerTodosLosUsuarios();
        const columnas = [];
        if(datos.length !== 0){
            datos[0]["_options"].attributes.forEach(dato => {
                if(dato !== 'id' && dato !== 'contrasena' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna)
                }
            })
        }

        // Si la solicitud es para una API (con encabezado Accept: application/json), devuelve datos en JSON
        if (req.headers.accept === 'application/json') {
            return res.status(200).json({usuarios: datos});
        }

        res.render("admin/show", {title, url, ruta, columnas, datos});
    } catch (error) {
        console.error("Error al obtener la lista de usuarios:", error);
        res.status(500).json({ message: "Error al obtener la lista de usuarios." });
    }
}

// Agregar un nuevo usuario
const getAddUsuarioForm = async (req, res) => {
    try {
        res.render("admin/usuario/add", {title, url, ruta});
    } catch (error) {
        console.error("Error al obtener el formulario de agregar usuario:", error);
        res.status(500).json({ message: "Error al obtener el formulario de agregar usuario." });
    }
}

const addUsuario = async (req, res) => {
    try {
        const { nombre, apellido, correo, telefono, contrasena, rol} = req.body;
        await usuarioService.crearUsuario(nombre, apellido, correo, telefono, contrasena, rol);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
        res.status(500).json({ message: "Error al agregar usuario." });
    }
}

// Consultar usuario por correo
const getConsultShowUsuarioForm = async (req, res) => {
    try {
        const content = {texto: "Consultar",  action: "consult", title, url, ruta}
        res.render("admin/usuario/consult", content);
    } catch (error) {
        console.error("Error al obtener el formulario de consulta de usuario:", error);
        res.status(500).json({ message: "Error al obtener el formulario de consulta de usuario." });
    }
}

const showUsuario = async (req, res) => {
    try {
        const datos = await usuarioService.obtenerUsuarioPorCorreo(req.body.correo);
        const columnas = [];
        if(datos.length !== 0){
            datos["_options"].attributes.forEach(dato => {
                if(dato !== 'id' && dato !== 'contrasena' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna)
                }
            })
        }
        res.render("admin/consultShow", {title, url, ruta, columnas, datos})
    } catch (error) {
        console.error("Error al mostrar el usuario:", error);
        res.status(500).json({ message: "Error al mostrar el usuario." });
    }
}

// Actualizar información del usuario
const getConsultEditUsuarioForm = async (req, res) => {
    try {
        const content = {texto: "Editar",  action: "edit", title, url, ruta}
        res.render("admin/usuario/consult", content);
    } catch (error) {
        console.error("Error al obtener el formulario de edición de usuario:", error);
        res.status(500).json({ message: "Error al obtener el formulario de edición de usuario." });
    }
}

const getEditUsuarioForm = async (req, res) => {
    try {
        let usuario;
        if(Object.keys(req.body).length === 0) {
            usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
        } else {
            usuario = await usuarioService.obtenerUsuarioPorCorreo(req.body.correo);
        }

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        res.render("admin/usuario/edit", {title, url, ruta, usuario});
    } catch (error) {
        console.error("Error al obtener el formulario de edición de usuario:", error);
        res.status(500).json({ message: "Error al obtener el formulario de edición de usuario." });
    }
}

const editUsuario = async (req, res) => {
    try {
        await usuarioService.actualizarUsuario(req.body.correo, req.body);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario." });
    }
}

// Eliminar registro de usuario
const getConsultDeleteUsuarioForm = async (req, res) => {
    try {
        const content = {texto: "Eliminar",  action: "delete/${usuario.id}", title, url, ruta}
        res.render("admin/usuario/consult", content);
    } catch (error) {
        console.error("Error al obtener el formulario de eliminación de usuario:", error);
        res.status(500).json({ message: "Error al obtener el formulario de eliminación de usuario." });
    }
}

const deleteUsuarioForm = async (req, res) => {
    try {
        await usuarioService.eliminarUsuarioCorreo(req.body.correo);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al eliminar al usuario:", error);
        res.status(500).json({ message: "Error al eliminar al usuario." });
    }
}

const deleteUsuario = async (req, res) => {
    try {
        await usuarioService.eliminarUsuarioId(req.params.id);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al eliminar al usuario:", error);
        res.status(500).json({ message: "Error al eliminar al usuario." });
    }
}

module.exports = {
    getUserList,
    getAddUsuarioForm,
    addUsuario,
    getConsultShowUsuarioForm,
    showUsuario,
    getConsultEditUsuarioForm,
    getEditUsuarioForm,
    editUsuario,
    getConsultDeleteUsuarioForm,
    deleteUsuarioForm,
    deleteUsuario
};