import React from 'react';
import { /* Link, */ useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

//Redux
import { useDispatch } from 'react-redux';

import { borrarProductoAction, obtenerProductoAction } from '../actions/productoActions';

const Producto = ({producto}) => {
    const { nombre, precio, id } = producto;
    const dispatch = useDispatch();
    const history = useNavigate();

    //Confirmar si desea eliminar producto seleccionado
    const confirmarEliminarProducto = id => {

        //preguntar al usuario que confirme accion
        Swal.fire({
            title: '¿Está seguro de eliminar el producto?',
            text: "No podrá revertir los cambios luego!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, lo confirmo!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                //pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
        })
    }

    //Función que redirige de forma programada.
    const redireccionarEdicion = producto => {
        dispatch( obtenerProductoAction(producto) );
        history(`/productos/editar/${producto.id}`);
    }
    
    return ( 
        <tr>
            <td>{nombre}</td>
            <td> 
                <span className='font-weight-bold'>{precio} €</span>
            </td>
            <td className='acciones'>
                {/* Con Link podremos redirigir a editar con el producto seleccionado */}
                {/* <Link to={`/productos/editar/${id}`} className="btn btn-primary mr-2">
                    Editar
                </Link> */}
                <button 
                    className="btn btn-primary mr-2"
                    type="button"
                    onClick={ () => redireccionarEdicion(producto) }
                    > Editar </button>
                <button 
                    type="button"
                    className='btn btn-danger'
                    onClick={ () => confirmarEliminarProducto(id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
     );
}
 
export default Producto;