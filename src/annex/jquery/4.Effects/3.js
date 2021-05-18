import {html as initialHTML} from '../index.json'
export const statement = <>
<p><b>3.&ensp;</b>En la p&aacute;gina se muestra un elemento <em>&lt;ul&gt;</em> con el identificador <em>"slideshow"</em>. Se pide que mediante JQuery, se muestren cada uno de los elementos <em>&lt;li&gt;</em> durante un segundo c&iacute;clicamente. As&iacute; pues, primero debe mostrarse durante 1 segundo el contenido <em>"Fruit"</em>, despu&eacute;s <em>"Vegetables"</em>, despu&eacute;s <em>"Bread"</em>, y volver a mostrar <em>"Fruit"</em> nuevamente.</p>
<p><em>(*) Para ayudarte puede emplear encadenamiento de efectos, haciendo que cada elemento se muestre, espere un segundo, se oculte, e invoque a una funci&oacute;n que muestre el siguiente.</em></p>
</>
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.min.js').then(() => {
    function showFirst() {
        $('#slideshow li').first().show(300).delay(400).hide(300, showSecond)
    }
    function showSecond() {
        $('#slideshow li').eq(1).show(300).delay(400).hide(300, showThird)
    }
    function showThird() {
        $('#slideshow li').last().show(300).delay(400).hide(300)
    }
    showFirst()
})`

export default ({CodeIframe}) => <CodeIframe name="effects-third" initialHTML={initialHTML} initialJS={initialJS}/>