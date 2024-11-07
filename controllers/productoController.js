const productoService = require('../services/productoServicio');
const categoriaService = require('../services/categoriaServicio');

const title = 'Ecommerce';
const url = "productos";
const ruta = "Productos";

// Controlador para obtener la lista de productos
const getProductList = async (req, res) => {
    try {
        // Llama al servicio para obtener todos los productos
        const datos = await productoService.obtenerTodosLosProductos();
        const columnas = [];

        // Si hay productos, se extraen las columnas, omitiendo ciertos atributos
        if (datos.length !== 0) {
            datos[0]["_options"].attributes.forEach(dato => {
                if (dato !== 'id' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna); // Agrega la columna formateada
                }
            });
        }

        // Si la solicitud es para una API (con encabezado Accept: application/json), devuelve datos en JSON
        if (req.headers.accept === 'application/json') {
            return res.status(200).json({ columnas, datos });
        }

        // Si no es una solicitud JSON, renderiza la vista usando Pug
        res.render("admin/show", { title, url, ruta, columnas, datos });
    } catch (error) {
        console.error("Error al obtener la lista de productos:", error);
        // En caso de error, responde con un mensaje en JSON
        res.status(500).json({ message: "Error al obtener la lista de productos." });
    }
};

// Controlador para mostrar el formulario de agregar producto
const getAddProductoForm = async (req, res) => {
    try {
        // Llama al servicio para obtener todas las categorías
        const categorias = await categoriaService.obtenerTodasLasCategorias();
        res.render("admin/producto/add", { title, url, ruta, categorias });
    } catch (error) {
        console.error("Error al obtener el formulario de agregar producto:", error);
        res.status(500).json({ message: "Error al obtener el formulario de agregar producto." });
    }
};

// Controlador para agregar un nuevo producto
const addProducto = async (req, res) => {
    try {
        // Llama al servicio para crear un nuevo producto con los datos recibidos
        await productoService.crearProducto(req.body);
        // Redirige a la página de productos
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).json({ message: "Error al agregar el producto." });
    }
};

// Consultar producto por id
const getConsultShowProductoForm = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        const content = {texto: "Consultar", action: "consult", title, url, ruta, productos};
        res.render("admin/producto/consult", content);
    } catch (error) {
        console.error("Error al obtener el formulario de consulta de producto:", error);
        res.status(500).json({ message: "Error al obtener el formulario de consulta de producto." });
    }
}

// Controlador para mostrar un producto por ID
const showProducto = async (req, res) => {
    try {
        // Llama al servicio para obtener el producto por su ID
        const datos = await productoService.obtenerProductoPorId(req.body.producto);
        if (!datos) {
            // Si el producto no existe, devuelve un mensaje de error
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        const columnas = [];
        // Obtiene las columnas para mostrar si el producto tiene datos
        if (datos.length !== 0) {
            datos["_options"].attributes.forEach(dato => {
                if (dato !== 'id' && dato !== 'createdAt' && dato !== 'updatedAt') {
                    let columna = dato.charAt(0).toUpperCase() + dato.slice(1);
                    columnas.push(columna);
                }
            });
        }

        // Devuelve datos en JSON si es una solicitud API
        if (req.headers.accept === 'application/json') {
            return res.status(200).json({ columnas, datos });
        }

        // Renderiza la vista de detalles del producto
        res.render("admin/consultShow", { title, url, ruta, columnas, datos });
    } catch (error) {
        console.error("Error al mostrar el producto:", error);
        res.status(500).json({ message: "Error al mostrar el producto." });
    }
};

// Actualizar información del producto
const getConsultEditProductoForm = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        const content = {texto: "Editar", action: "edit", title, url, ruta, productos};
        res.render("admin/producto/consult", content);
    } catch (error) {
        console.error("Error al obtener el formulario de edición de producto:", error);
        res.status(500).json({ message: "Error al obtener el formulario de edición de producto." });
    }
}

const getEditProductoForm = async (req, res) => {
    try {
        let producto;
        if(Object.keys(req.body).length === 0) {
            producto = await productoService.obtenerProductoPorId(req.params.id);
        } else {
            producto = await productoService.obtenerProductoPorId(req.body.producto);
        }
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }
        res.render("admin/producto/edit", {title, url, ruta, producto});
    } catch (error) {
        console.error("Error al obtener el formulario de edición de producto:", error);
        res.status(500).json({ message: "Error al obtener el formulario de edición de producto." });
    }
}

// Controlador para actualizar un producto por ID
const editProducto = async (req, res) => {
    try {
        // Llama al servicio para actualizar el producto con el ID y datos proporcionados
        await productoService.actualizarProducto(req.params.id, req.body);
        // Redirige a la lista de productos después de actualizar
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).json({ message: "Error al actualizar el producto." });
    }
};

// Eliminar registro de producto
const getConsultDeleteProductoForm = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodosLosProductos();
        const content = {texto: "Eliminar", action: "delete/${producto.id}", title, url, ruta, productos};
        res.render("admin/producto/consult", content);
    } catch (error) {
        console.error("Error al obtener el formulario de eliminación de producto:", error);
        res.status(500).json({ message: "Error al obtener el formulario de eliminación de producto." });
    }
}

const deleteProductoForm = async (req, res) => {
    try {
        await productoService.eliminarProducto(req.body.producto);
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error al eliminar el producto." });
    }
}

// Controlador para eliminar un producto por ID
const deleteProducto = async (req, res) => {
    try {
        // Llama al servicio para eliminar el producto con el ID proporcionado
        await productoService.eliminarProducto(req.params.id);
        // Redirige a la lista de productos después de eliminar
        res.redirect(`/admin/${url}`);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({ message: "Error al eliminar el producto." });
    }
};

// Exporta los controladores para su uso en las rutas
module.exports = {
    getProductList,
    getAddProductoForm,
    addProducto,
    getConsultShowProductoForm,
    showProducto,
    getConsultEditProductoForm,
    getEditProductoForm,
    editProducto,
    getConsultDeleteProductoForm,
    deleteProductoForm,
    deleteProducto
};