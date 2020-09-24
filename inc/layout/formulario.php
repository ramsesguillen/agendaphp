<div class="campos">
    <div class="campo">
        <label for="nombre">* Nombre:</label>
        <input type="text" value="<?= isset($contacto['nombre']) ? $contacto['nombre'] : '' ?>" placeholder="Nombre contacto" id="nombre">
    </div>
    <div class="campo">
        <label for="empresa">* Empresa:</label>
        <input type="text" value="<?= isset($contacto['empresa']) ? $contacto['empresa'] : '' ?>" placeholder="Nombre empresa" id="empresa">
    </div>
    <div class="campo">
        <label for="telefono">* Telefono:</label>
        <input type="tel" value="<?= isset($contacto['telefono']) ? $contacto['telefono'] : '' ?>" placeholder="Telefono" id="telefono">
    </div>
</div> <!-- Campos -->

<div class="campo enviar">
    <?php 
        $texto_btn = (isset($contacto['nombre'])) ? 'Guardar' : 'Añadir';

        $accion = (isset($contacto['nombre'])) ? 'editar' : 'crear';
    ?>
    <input type="hidden" id="accion" value="<?= $accion ?>">
    <?php if ( isset($contacto['id'])) {?>
        <input type="hidden" id="id" value="<?= $contacto['id'] ?>">
    <?php } ?>
    <input type="submit" value="<?= $texto_btn ?>">
</div>