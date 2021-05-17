import img from './2.jpg'
export const statement = <p><b>2.&ensp;</b>Crea una p&aacute;gina provista de una imagen y cuatro botones: <em>"Arriba"</em>, <em>"Abajo"</em>, <em>"Izquierda"</em>, <em>"Derecha"</em>. Cada bot&oacute;n al ser pulsado debe desplazar la imagen 1 pixel en la direcci&oacute;n correspondiente. Para ello debes crear cuatro funciones de javascript: <em>MoverArriba(), MoverAbajo(), MoverIzquierda(), </em> y <em>MoverDerecha()</em> cada una de las uales modificar la posici&oacute;n de la imagen 1 p&iacute;xel en la direcci&oacute;n correspondiente.</p>

const initialHTML = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    </head>
    <body class="container">
        <ul id="second-move" class="nav justify-content-center">
            <li data-direction="up" class="nav-item">
                <a href="#" class="nav-link">Up</a>
            </li>
            <li data-direction="left" class="nav-item">
                <a href="#" class="nav-link">Left</a>
            </li>
            <li data-direction="down" class="nav-item">
                <a href="#" class="nav-link">Down</a>
            </li>
            <li data-direction="right" class="nav-item">
                <a href="#" class="nav-link">Right</a>
            </li>
        </ul>
        <img id="second-img" class="img-fluid position-absolute" src=${img} width="40%"/>
    </body>
</html>`
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('a').click(e => e.preventDefault())
    const secondImg = $('#second-img')
    $('#second-move li').click(function() {
        switch($(this).data('direction')) {
            case 'up':
                secondImg.offset((idx, value) => {
                    return {top: value.top - 1, left: value.left}
                })
                break
            case 'left':
                secondImg.offset((idx, value) => {
                    return {top: value.top, left: value.left - 1}
                })
                break
            case 'down':
                secondImg.offset((idx, value) => {
                    return {top: value.top + 1, left: value.left}
                })
                break
            default :
                secondImg.offset((idx, value) => {
                    return {top: value.top, left: value.left + 1}
                })
                break
        }
    })
})`

export default ({CodeIframe}) => <CodeIframe name="events-second" initialHTML={initialHTML} initialJS={initialJS}/> 