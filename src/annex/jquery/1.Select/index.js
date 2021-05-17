import Alert from 'react-bootstrap/Alert'
import {html as initialHTML} from '../index.json'
export const select = {
    name: 'select'
}
const statement = <>
<p>Partiendo de la p&aacute;gina <em>index.html</em> implementar las siguientes selecciones empleando JQuery:</p>
<ul>
    <li>Seleccionar todos los elementos <em>div</em> que poseen la clase <em>"module".</em></li>
    <li>Seeleccionar el tercer &iacute;tem de la lista desordenada con id=<em>#myList.</em></li>
    <li>Seleccionar el elemento <em>&lt;label&gt;</em> del elemento <em>input</em> utilizando un selector de atributo.</li>
    <li>Averiguar cuantos elementos en la p&aacute;gina est&aacute;n ocultos (length).</li>
    <li>Averiguar cuantas im&aacute;genes en la p&aacute;gina poseen el atributo alt.</li>
    <li>eleccionar todas las filas impares del cuerpo de la tabla.</li>
</ul>
</>
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    console.dir($('div.module'))
    console.dir($('#myList li').eq(2))
    console.dir($('label[for]'))
    console.dir($(':hidden').length)
    console.dir($('img[alt]'))
    console.dir($('tr:odd'))
})
`
export default ({CodeIframe}) => 

<div className="mb-4 rounded p-2 p-sm-4 bg-light">
    <Alert variant="info">{statement}</Alert>
    <CodeIframe name="select" initialHTML={initialHTML} initialJS={initialJS}/>
</div>