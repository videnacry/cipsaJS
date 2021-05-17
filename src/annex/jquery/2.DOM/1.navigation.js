import {html as initialHTML} from '../index.json'
export const statement = <>
<p>Partiendo de la p&aacute;gina <em>index.html</em> implementar las siguientes selecciones empleando JQuery:</p>
<ul>
    <li>Seleccionar todas las im&aacute;genes en la p&aacute;gina mostrando en la consola el valor del atributo <em>"alt"</em> de cada imagen.</li>
    <li>Seleccionar el elemento <em>input</em> del formulario y a&ntilde;adirle la clase <em>"input_text"</em>.</li>
    <li>Seleccionar el &iacute;tem que posee la clase <em>"current"</em> dentro de la lista <em>id=myList,</em> eliminarlo de la lista, y a&ntilde;adir la clase <em>"current"</em> al siguiente &iacute;tem de la lista.</li>
    <li>Seleccionar el elemento select dentro del elemento con <em>"id=specials"</em>,  a coninuaci&oacute;n navegar por el DOM hasta el elemento del bot&oacute;n <em>submit.</em></li>
    <li>Seleccionar el primer &iacute;tem de la lista con <em>id="slideshow"</em>; a&ntilde;adirle la clase <em>"current"</em> al mismo y luego a&ntilde;adir la clase <em>"disabled"</em> al resto de elementos hermanos.</li>
    <li></li>
</ul>
</>
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('img').each((idx, item) => console.log(item.alt))
    $('#formulario input').addClass('input_text')
    $('#myList .current').remove()
  	$('#myList li:first').addClass('current')
    $('#specials select').after('button[submit]')
    $('#slideshow li').first().addClass('current').siblings().addClass('disabled')
})
`
export default ({CodeIframe}) => <CodeIframe name="dom-navigation" initialHTML={initialHTML} initialJS={initialJS}/>