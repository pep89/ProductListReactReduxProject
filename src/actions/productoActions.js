import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

//================================================================================================
//===========Crear nuevos productos===============================================================
export function crearNuevoProductoAction( producto ){

    return async (dispatch) => {
        dispatch( agregarProducto() );
        
        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) )

            //Alerta si la consulta ha salido bien
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error) {
            //console.log(error);

            //si hay un error cambiar el state
            dispatch( agregarProductoError(true))

            //alerta de error si la consulta ha salido mal
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intetelo de nuevo'
            })
        }
    }
}


const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
})

//Si el producto se guarda en la base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//Si hubo un error
const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
})


//=============================================================================================
//=================descarga los productos de la BBDD===========================================
export function obtenerProductosAction(){
    return async dispatch => {
        dispatch( descargarProductos() ); 
        setTimeout( async () => {
            try {
                const respuesta = await clienteAxios.get('/productos');
                dispatch( descargarProductosExitosa(respuesta.data) );
            
            } catch (error) {
                dispatch( descargaProductosError() );
            }
        }, 1000);
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargarProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})


//=============================================================================================
//================= Elimina el producto seleccionado ==========================================

export function borrarProductoAction(id) {

    return async (dispatch) => {
        dispatch(obtenerProductoEliminar(id) );
        
        try {
            await clienteAxios.delete(`/productos/${id}`);
            dispatch( eliminarProductoExito() );

            //Si se elimina, mostrar alerta de confirmación
            Swal.fire(
                'Eliminado!',
                'El producto ha sido Eliminado.',
                'success'
            )

        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () =>({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
})

//=============================================================================================
//================= Obtiene el producto seleccionado ==========================================

export function obtenerProductoAction(producto) {

    return (dispatch) => {
        dispatch( obtenerProductoEditar(producto) )
    }
}

const obtenerProductoEditar = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

//=============================================================================================
//================= Edita el producto seleccionado ==========================================

export function editarProductoAction(producto) {
    return async (dispatch) => {
        dispatch( comenzarEditarProducto() );

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto) );
        } catch (error) {
            console.log(error);
            dispatch( editarProductoError() );
        }
    }
}

const comenzarEditarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})



