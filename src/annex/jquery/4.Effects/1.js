import {html as initialHTML} from '../index.json'
export const statement = <>
<p><b>1.&ensp;</b>En la p&aacute;gina se muestra una capa &lt;div&gt; con el identificador <em>"blog"</em>. Esta capa contiene una serie de p&aacute;rrafos encabezados por un elemento &lt;h3&gt; cada uno.</p>
<p>Se pide que al hacer click en cada encabezado &lt;h3&gt;se muestre el p&aacute;rrafo correspondiente ocult&aacute;ndose el resto.</p>
<p>(*) Para ayudarte a seleccionar los elementos visibles e invisibles no olvides que puede emplear los selectores <em>":visible"</em> y <em>":hidden"</em>.</p>
</>
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('#blog h3').click(function() {
        $('#blog p').hide()
        $(this).next('p').show()
    })
})`

export default ({CodeIframe}) => <CodeIframe name="effects-first" initialHTML={initialHTML} initialJS={initialJS}/>