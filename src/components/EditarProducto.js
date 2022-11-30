import React, {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {
    //State local del componente
    const [ producto, setProducto ] = useState({
        nombre: '',
        precio: ''
    })
    const history = useNavigate();
    //REDUX (producto a editar)
    const dispatch = useDispatch();
    const productoEditar = useSelector( state => state.productos.productoEditar );
    
    useEffect(() => {
        if(!productoEditar) history('/'); 
        setProducto(productoEditar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productoEditar])

    if(!productoEditar) return null;

    const onChangeFormulario = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }
    
    const { nombre, precio } = producto;

    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch ( editarProductoAction(producto) );

        history('/');
    }
    return ( 
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Editar Producto
                        </h2>

                        <form
                            onSubmit={submitEditarProducto}
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name="nombre"
                                    value={ nombre }
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name="precio"
                                    value={ precio }
                                    onChange={onChangeFormulario}
                                />
                            </div>

                            <button 
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            > Guardar Cambios
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default EditarProducto;