/** 
 * *
 * ?
 * !
 * //
 * @param  formulario Variable global
 * todo
*/

//* REFERENCIAS DEL HTML
const formularioContacto = document.querySelector('#contacto');
const listadoContacto = document.querySelector('#listado-contactos tbody');
const inputBuscador = document.querySelector('#buscar');




//* FUNCIONES
const leerFormulario = ( e ) => {
    e.preventDefault();

    // Leer los datos de los inputs
    const nombre   = document.querySelector('#nombre').value,
          empresa  = document.querySelector('#empresa').value,
          telefono = document.querySelector('#telefono').value,
          accion   = document.querySelector('#accion').value;

    if ( nombre === '' || empresa === '' || telefono === '') {
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        const inforContacto = new FormData();

        inforContacto.append('nombre', nombre);
        inforContacto.append('empresa', empresa);
        inforContacto.append('telefono', telefono);
        inforContacto.append('accion', accion);

        if ( accion === 'crear' ) {
            insertarBD( inforContacto );
        } else {
            const idRegistro = document.querySelector('#id').value; 
            inforContacto.append('id', idRegistro);
            actualizarRegistro( inforContacto );
        }
    }
}


/** 
 * *Inserta en la base de datos Mediante AJAX 
 * @param datos informacion del formulario
*/
const insertarBD = ( datos ) => {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    xhr.onload = function() {
        if ( this.status == 200 ) {
            
            //* Destructuracion del objeto devuelto por el servidor 
            const {datos, respuesta} = JSON.parse( xhr.responseText );
            const {nombre, empresa, telefono, id_insertado} = datos;

            //* Creando el tr e insertando los td  
            const nuevoContacto = document.createElement('tr');
            
            nuevoContacto.innerHTML = `
                <td>${nombre}</td>
                <td>${empresa}</td>
                <td>${telefono}</td>
            `;
            
            //* Creando los td de las acciones 
            const contenedorAcciones = document.createElement('td');
            
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar')

            contenedorAcciones.appendChild( btnEditar );

            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash-alt');

            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', id_insertado );
            btnEliminar.classList.add('btn', 'btn-borrar');

            contenedorAcciones.appendChild( btnEliminar );

            nuevoContacto.appendChild( contenedorAcciones );

            listadoContacto.appendChild( nuevoContacto );

            //* Recetear el formulario
            formularioContacto.reset();

            //* Mostrar notificacion de insertado correctamente 
            mostrarNotificacion('Contacto creado correctamente', 'correcto');

            numeroContactos();
        }
    }

    xhr.send( datos );
}

/** 
 * *Actulizar los registros
*/
const actualizarRegistro = ( datos ) => {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'inc/modelos/modelo-contactos.php', true);

    xhr.onload = function() {
        if ( this.status == 200 ) {
            const {respuesta} = JSON.parse(xhr.responseText);
            console.log(respuesta);

            if ( respuesta === 'correcto') {
                mostrarNotificacion('Contacto editado correctamente', 'correcto')
            } else {
                mostrarNotificacion('Hubo un error', 'error')
            }

            setTimeout(() => {
                window.location = 'index.php';
            }, 3000);
        }
    }

    xhr.send(datos);
}
/** 
 * *Eliminar el contacto
 * 
*/
const eliminarContacto = ( e ) => {
    if ( e.target.parentElement.classList.contains('btn-borrar') ) {
        const id = e.target.parentElement.getAttribute('data-id');
        
        const respuesta = confirm('¿Estas seguro?');

        if ( respuesta ) {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', `inc/modelos/modelo-contactos.php?id=${id}&accion=borrar`, true);

            xhr.onload = function() {
                if ( this.status === 200 ) {
                    const resp = JSON.parse( xhr.responseText );

                    if ( resp.respuesta == 'correcto') {
                        e.target.parentElement.parentElement.parentElement.remove();
                        mostrarNotificacion('Contacto eliminado', 'correcto')
                        numeroContactos();
                    } else {
                        mostrarNotificacion('Hubo un error', 'error');
                    }

                }
            }

            xhr.send();
        }

    }
}


/** 
 * * Buscador de registros
 * 
*/
const buscarContacto = ( e ) => {
    const exprecion = new RegExp(e.target.value, 'i'),
          registros = document.querySelectorAll('tbody tr');

    registros.forEach(registro => { 
        registro.style.display = 'none';

        if ( registro.childNodes[1].textContent.replace(/\s/g, " ").search( exprecion ) != -1 ) {
            registro.style.display ='table-row';
        }
        numeroContactos();
    });
}


/** 
 * *Muestra el numero de contactos
 * 
*/
const numeroContactos = () => {
    const totalContactos   = document.querySelectorAll('tbody tr'),
          contenedorNumero = document.querySelector('.total-contactos span'); 

    let total = 0;

    totalContactos.forEach(contacto => {
        if (contacto.style.display === '' || contacto.style.display === 'table-row') {
            total++;
        }
    });

    contenedorNumero.textContent = total;
}
/** 
 * * ==============================================
 * * Notificación en pantalla
 * @param texto mensaje a mostrasr 
 * @param clase class para el css
*/
const mostrarNotificacion = ( mensaje, clase ) => {
    const notificacion = document.createElement('div');
    notificacion.classList.add( clase, 'notificacion', 'sombra' );
    notificacion.textContent = mensaje;

    //formulario 
    formularioContacto.insertBefore( notificacion, document.querySelector('form legend') );

    // Ocultar y Mostrar la notificación
    setTimeout(() => {
        notificacion.classList.add('visible');
        setTimeout(() => {
            setTimeout(() => {
                notificacion.classList.remove('visible');
            }, 500);
        }, 3000);
    }, 100);
} 













//* EJECUTAR EVENTOS
const eventLister = () => {
    // Cuando el formulario de crear o editar se ejecuta
    formularioContacto.addEventListener('submit', leerFormulario );
    numeroContactos();

    if ( listadoContacto ) {
        listadoContacto.addEventListener('click', eliminarContacto );
    }
    
    inputBuscador.addEventListener('input', buscarContacto);
}

eventLister();