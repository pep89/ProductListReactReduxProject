import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';
import { 
    mostrarAlertaAction,
    ocultarAlertaAction
} from '../actions/alertaActions';




const NuevoProducto = () => {

    const history = useNavigate();

    //state local del componente NuevoProducto
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);

    //ustilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    //Acceder al state del store
    const cargando = useSelector( (state) => state.productos.loading );
    const error = useSelector( state => state.productos.error );
    const alerta = useSelector( state => state.alerta.alerta );

    //console.log(cargando);

    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );

    //Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();
        
        //Validar formulario
        if(nombre.trim() === '' || precio <= 0){
            
            const alertaMsg = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }

            dispatch( mostrarAlertaAction(alertaMsg) );

            return;
        }

        
        //Si no hay errores
        dispatch( ocultarAlertaAction() );


        //crear el nuevo producto
        agregarProducto({
            nombre, // nombre (key) : nombre (value)
            precio // precio (key) : precio (value)
        });

        //Redireccionar a la pagina principal
        if(error) history('/');
    }


    return ( 
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>
                            Agregar Nuevo Producto
                        </h2>
                        
                        {alerta ? 
                        <p className={alerta.classes}>{alerta.msg}</p>
                        : null }

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className='form-group'>
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    placeholder='Nombre Producto'
                                    name="nombre"
                                    value={nombre}
                                    onChange={e => setNombre(e.target.value)}
                                />
                            </div>

                            <div className='form-group'>
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className='form-control'
                                    placeholder='Precio Producto'
                                    name="precio"
                                    value={precio}
                                    onChange={ e => setPrecio( Number(e.target.value) ) }
                                />
                            </div>

                            <button 
                                type='submit'
                                className='btn btn-primary font-weight-bold text-uppercase d-block w-100'
                            > Agregar
                            </button>
                        </form>

                        { cargando ? <p>Cargando...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center"> Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;