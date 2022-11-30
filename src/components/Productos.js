import React, { useEffect } from "react";
import Producto from "./Producto";
//Redus
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";

const Productos = () => {
    const dispatch = useDispatch();

    useEffect(() => {
    //Consultar la API
    const cargarProductos = () => dispatch(obtenerProductosAction());

    cargarProductos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //obtener el state
    /* state --> acceso al state
    productos --> en reducers/index.js tenemos el reducer productos que coje el valor del reducer "productosReducer"
    listaProductos --> en el reducer "productosReducer" tenemos un stateInicial con una propiedad llamada listaProductos
    Así que:
    del state accedemos al reducer productos y de este accedemos a la lista de productos. 
    */
    const listaProductos = useSelector( state => state.productos.listaProductos);
    const error = useSelector( state => state.productos.error );
    const cargando = useSelector( state => state.productos.loading );

    return (
    <>
        <h2 className="text-center my-5"> Listado de Productos</h2>

        { error ?  <p className="font-weight-bold alert alert-danger text-center mt-4"> Hubo un error </p> : null }

        { cargando ? <p className="text-center">Cargando...</p> : null}

        <table className="table table-striped">
        <thead className="bg-primary table-dark">
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                listaProductos.length === 0
                ?   
                    <tr>
			            <td colSpan='3'>No hay productos</td>
		            </tr>
                : listaProductos.map( producto => (
                    <Producto 
                        key={producto.id}
                        producto={producto}
                    />
                ))
            }
        </tbody>
        </table>
    </>
    );
};

export default Productos;
