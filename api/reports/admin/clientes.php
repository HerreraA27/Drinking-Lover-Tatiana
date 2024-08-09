<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');
// Se incluye la clase para acceder a los datos de clientes.
require_once('../../models/handler/cliente_handler.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se inicia el reporte con el encabezado del documento.
$pdf->startReport('Client Report');

// Se instancia el modelo ClienteHandler para obtener los datos.
$clienteHandler = new ClienteHandler;

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataClientes = $clienteHandler->readAll()) {
    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(200);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    // Se imprimen las celdas con los encabezados.
    $pdf->cell(60, 10, 'First Name', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Last Name', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Email', 1, 1, 'C', 1); // Reducido el tamaño de la columna de email

    // Se establece un color de relleno para mostrar los datos de los clientes.
    $pdf->setFillColor(240);
    // Se establece la fuente para los datos de los clientes.
    $pdf->setFont('Arial', '', 11);

    // Se recorren los registros fila por fila.
    foreach ($dataClientes as $rowCliente) {
        // Se imprimen las celdas con los datos de los clientes.
        $pdf->cell(60, 10, $pdf->encodeString($rowCliente['nombre_cliente']), 1, 0);
        $pdf->cell(60, 10, $pdf->encodeString($rowCliente['apellido_cliente']), 1, 0);
        $pdf->cell(60, 10, $pdf->encodeString($rowCliente['correo_cliente']), 1, 1); // Reducido el tamaño de la columna de email
    }
} else {
    $pdf->cell(0, 10, $pdf->encodeString('There are no clients to display'), 1, 1);
}

// Se llama implícitamente al método footer() y se envía el documento al navegador web.
$pdf->output('I', 'clients_report.pdf');
?>