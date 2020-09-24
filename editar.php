<?php include 'inc/funciones/funciones.php'; ?>
<?php include 'inc/layout/header.php'; ?>

<?php 

    $id = filter_var( $_GET['id'], FILTER_VALIDATE_INT );

    if ( !$id ) {
        die('no es valido');
    }

    $resultado = obtenerContacto( $id );

    $contacto = $resultado->fetch_assoc();

?>
<div class="contenedor-barra">
    <div class="contenedor barra">
        <a href="index.php" class="btn btn-voler volver">Volver</a>
        <h1>Agenda de Contactos</h1>
    </div>
    
</div>


<div class="bg-amarillo contenedor sombra">
    <form action="#" id="contacto">
        <legend>Edite el contacto<span></span></legend>
        
        <?php include 'inc/layout/formulario.php'; ?>
    </form>
</div> <!-- bg-amarillo -->


<?php include 'inc/layout/footer.php'; ?>