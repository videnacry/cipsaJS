import {html as initialHTML} from './../index.json'
export const statement = <>
    <p><b>5.&ensp;</b>Tomando como punto de partida la p&aacute;gina 'index.html', implementar las siguientes operaciones para simular un sitema de navegaci&oacute;n por pesta&ntilde;as:</p>
    <ul>
        <li>Oculta toas las capas con la clase de estilo <em>"module"</em>, excepto la primera.</li>
        <li>Crea una lista desordenada antes de la primera capa con estilo "module".</li>
        <li>Recorre las capas con estilo "module" empleando $().each() y crea un elemento para la lista desordenada por cada capa con el texto presente en su encabezado &lt;h2&gt;. Estas son las pesta&ntilde;as.</li>
        <li>
            <p>Registra el evento "click" de cada elemento de la lista de modo que se realicen las siguientes operaciones:</p>
            <ul>
                <li>Oculte todas las capas con estilo "module" mostrando &uacute;nicamente la correspondiente al elemento.</li>
                <li>Elimina la clase "current" de todos los elementos de la lista a&ntilde;adie&eacute;ndolo al elemento seleccionado.</li>
            </ul>
        </li>
    </ul>
</>

const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('.module').hide().first().show()
    $('.module').first().before('<ul id="fifth-nav"></ul>')
    $('.module').each(function(idx){
        const id = 'module-' + idx
        this.id = id
        $('#fifth-nav').append($('<li data-id="' + id + '">' + $(this).children('h2').first().text() + '</li>'))
    })
    $('#fifth-nav li').click(function(){
        $('.module').not('[id=' + $(this).data('id') + ']').hide()
        $('#' + $(this).data('id')).show()
        $('.module').not('[id=' + $(this).data('id') + ']').removeClass('current')
        $('#' + $(this).data('id')).addClass('current')
    })
})`

export default ({CodeIframe}) => <CodeIframe name="events-fifth" initialHTML={initialHTML} initialJS={initialJS}/> 