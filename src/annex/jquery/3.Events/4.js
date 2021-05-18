import {html as initialHTML} from './../index.json'
export const statement = <>
    <p><b>4.&ensp;</b>Tomando como punto de partida la p&aacute;gina 'index.html', implementar las siguientes operaciones:</p>
    <ul>
        <li>Establece el valor de la caja de texto igual al del elemento &lt;label&gt;</li>
        <li>A&ntilde;adir la clase de estilo <em>"hint"</em> a la caja de texto. (La clase se encuentra ya declarada en el archivo <em>"css/style.css"</em>).</li>
        <li>Elimina el elemnto &lt;label&gt;.</li>
        <li>Registra el evento <em>"focus"</em> a la caja de texto para eliminar el texto de sugerencia y la clase de estilo <em>"hint"</em> cuando &eacute;sta tenga el foco.</li>
        <li>Registra el evento <em>"blur"</em> a la caja de texto para restaurar el texto de sugerencia y la clase de estilo <em>"hint"</em> si no se ha insertado ning&uacute;n valor al perder el foco</li>
    </ul>
</>

const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('input:text').val($('label').text())
    $('input:text').addClass('hint')
    const suggestedText = $('label').detach().text()
    $('input:text').focus(function(){$(this).val('').removeClass('hint')})
    $('input:text').blur(function(){$(this).val(suggestedText).addClass('hint')})
})`

export default ({CodeIframe}) => <CodeIframe name="events-fourth" initialHTML={initialHTML} initialJS={initialJS}/> 