import {html as initialHTML} from '../index.json'
export const statement = <>
<p><b>2.&ensp;</b>En la p&aacute;gina se muestra una barra de navegaci&oacute;n con tres opciones. La opci&oacute;n <em>"Resources"</em> cuenta con un submen&uacute; que no es visible por defecto ya que tiene asignado la regla de estilo <em>"#nav li ul"</em> definida en <em>styles.css</em> con la propiedad <em>"display:none"</em>.</p>
<p>Se pide que al posiciorarse el puntero del rat&oacute;n sobre la opci&oacute;n <em>"Resources"</em> se muestre mediante JQuery la lista de subopciones y que se oculte al desplazarse el puntero fuera.</p>
</>
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('#nav li:contains(Resources)').on({
        mouseenter: function() {
            $(this).children('ul').first().show()
        },
        mouseout: function() {
            $(this).children('ul').first().hide()
        }
    })
})`

export default ({CodeIframe}) => <CodeIframe name="effects-second" initialHTML={initialHTML} initialJS={initialJS}/>