
export const ui = {
    name: 'ui',
    type:'module'
}

const statement = <>
<p><b>1.-</b>&nbsp;Crear una p&aacute;gina que muestre una tabla de contactos indicando DNI, Nombre y Telefono que muestre por defecto el contacto <em>"11111111A", Administrador, 555-000-001.</em></p>
<p>Al final de la table debe mostrarse un bot&oacute; <em>"A&ntilde;adir"</em>, y a la derecha de cada contacto en la tabla otro bo&oacute;n <em>"Eliminar"</em></p>
<p>Cuando el usuario pulse el bo&oacute;n <em>"A&ntilde;adir"</em> debe mostrarse un cuadro de di&aacute;logo con un formulario en el que el usuario introduzca el DNI, nombre y tel&eacute;fono de un nuevo contacto. El cuadro de di&aacute;logo debe mostrarse un bot&oacute;n <em>"OK"</em> para confirmar el alta y otro <em>"Cancelar"</em></p>
<p>Cuano el usuario pulsa el bo&oacute;n <em>"OK"</em> debe comprobarse que se haya introducido un valor en las tres cajas de texto. De no ser as&iacute;, debe te&ntilde;irse de rojo la caja vac&iacute;a y mostrar un mensaje indicativo a su lado derecho</p>
<p>Si el usuario ha introducido datos en todas las cajas de texto al pulsar el bo&oacute;n <em>"OK"</em> debe cerrarse el cuadro de di&aacute;logo y a&ntilde;adir los datos del nuevo contacto a la tabla de la p&aacute;gina incluyendo el bo&oacute;n <em>"Eliminar".</em></p>
<p>Al pulsar el bot&oacute;n <em>"Eliminar"</em> de una fila, &eacute;sta debe eliminarse de la tabla solicitando antes una confirmaci&oacute;n mostrado el nombre y DNI del usuario.</p>
<p>Si el usuario responde a <em>"Aceptar"</em> debe eliminarse los datos del contacto de la tabla.</p>
</>

const initialHTML = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
    </head>
    <body class="ui-widget ui-widget-content">
        <table width="100%">
            <thead class="ui-widget-header">
                <tr>
                    <th scope="col">DNI</th>
                    <th scope="col">NOMBRE</th>
                    <th scope="col">TELEFONO</th>
                    <th></th>
                </tr>
            </thead>
            <tbody align="center">
                <tr>
                    <td>111111111A</td>
                    <td>Administrador</td>
                    <td>555-000-001</td>
                    <td><button>ELIMINAR</button></td>
                </tr>
            </tbody>
            <tfoot align="center">
                <tr><td colspan="4">&nbsp;</td></tr>
                <tr><td colspan="4"><button id="ui-add">A&Ntilde;ADIR</button></td></tr>
            </tfoot>
        </table>
        <div id="dialog" title="Agregar contacto">
            <form>
                <div><label for="ui-dni">DNI</label></div>
                <input id="ui-dni" type="text" class="ui-widget-content ui-corner-all">
                <div>&nbsp;</div>
                <div><label for="ui-name">NOMBRE</label></div>
                <input id="ui-name" type="text" class="ui-widget-content ui-corner-all">
                <div>&nbsp;</div>
                <div><label for="ui-tel">TEL&Eacute;FONO</label></div>
                <input id="ui-tel" type="telephone" class="ui-widget-content ui-corner-all">
            </form>
        </div>
        <div id="ui-confirm">
            <p></p>
        </div>
    </body>
</html>
`
const initialJS = `

const state = {
}

const isNum = num =>
    num === '' || num === null || typeof num === 'boolean' || isNaN(num) ? false : true
async function imports() {
    await import('https://code.jquery.com/jquery-3.6.0.js')
    await import('https://code.jquery.com/ui/1.12.1/jquery-ui.js')
	$('button').button().not('#ui-add').addClass('ui-state-highlight')
    $('#dialog').first().dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Ok: () => {
                let validInputs = true
                $('form div[data-rol=msg]').remove()
                $('form input').removeClass('ui-state-error')
                $('form input').each(function() {
                    if (!this.value.length > 0) {
                        validInputs = false
                        $(this).addClass('ui-state-error').after($('<div data-rol="msg"><small>Introduce un valor</small></div>'))
                    }
                })
                if (validInputs) {
                    const deleteTD = '<td><button class="ui-button ui-corner-all ui-widget ui-state-highlight">ELIMINAR</button></td>'
                    const nameTD =  '<td>' + $('#ui-name').val() + '</td>'
                    const dniTD = '<td>' + $('#ui-dni').val() + '</td>'
                    const telTD = '<td>' + $('#ui-tel').val() + '</td>'
                    $('#dialog').dialog('close')
                    $('tbody').append($('<tr>' + dniTD + nameTD + telTD + deleteTD + '</tr>'))
                    $('td button.ui-state-highlight').click(deleteContact)
                }
            },
            Cancelar: () => $('#dialog').first().dialog('close')
        }
    })
    $('#ui-add').first().click(() => {
        $('form input').val('')
        $('#dialog').dialog('open')
    })
    $('form').first().submit(function(e) {
        e.preventDefault()
    })
    let eraseRow
    $('#ui-confirm').dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            Aceptar: function() {
                $(this).dialog('close')
                eraseRow.remove()
            },
            Cancelar: () => $('#ui-confirm').dialog('close')
        }
    })
    $('td button.ui-state-highlight').click(deleteContact)
    function deleteContact() {
        eraseRow = $(this).closest('tr')
        const dni = eraseRow.find('td').first().text()
        const name = eraseRow.find('td').eq(1).text()
        $('#ui-confirm').dialog('open').find('p').text('Desea eliminar a ' + name + ' DNI: ' + dni)
    }
}

imports()
`

export default ({CodeIframe}) =>
    <div className="mb-4 rounded p-2 p-sm-4 bg-secondary">
        <div className="alert alert-info">{statement}</div>
        <CodeIframe name="forms" initialHTML={initialHTML} initialJS={initialJS}/>
    </div>