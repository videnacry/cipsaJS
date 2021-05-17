import {html as initialHTML} from '../index.json'
export const statement = <>
<p>Partiendo de la p&aacute;gina <em>index.html</em> implementar las siguientes selecciones empleando JQuery:</p>
<ul>
    <li>A&ntilde;adir 5 nuevos &iacute;tems al final de la lista desordenada con <em>id="myList"</em> empleando un bucle.</li>
    <li>Remover los &iacute;tems impares de la lista.</li>
    <li>A&ntilde;adir un elemento <em>h2</em> y un p&aacute;rrafo al final de la capa con el estilo <em>"module".</em></li>
    <li>A&ntilde;adir otra opci&oacute;n al elemento select con el valor <em>"Wednesday".</em></li>
    <li>A&ntilde;adir una nueva capa con el estilo <em>"module"</em> a la p&aacute;gina despu&eacute;s del &uacute;ltimo; luego a&ntilde;adir una copia de una de las im&aacute;genes existentes dentro de la nueva capa.</li>
</ul>
</>
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    for (let count = 0; count < 5; count++) {
        $('#myList').append('<li>nuevo item</li>')
    }
    $('#myList').odd().remove()
    $('div.module').after($('<h2>nuevo t&iacute;tulo</h2><p>nuevo parrafo</p>'))
    $('select').append($('<option>Wednesday</option>'))
    $('.module').last().after($('<div class="module"></div>')).next().append($('img').first().clone())
})
`
export default ({CodeIframe}) => <CodeIframe name="dom-manipulation" initialHTML={initialHTML} initialJS={initialJS}/>