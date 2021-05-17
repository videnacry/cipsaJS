import img from './3.jpg'
export const statement = <p><b>3.&ensp;</b>Modifica el ejercicio anterior para emplear &uacute;nicamente una funci&oacute;n de javascript llamada Mover. Esta funci&oacute;n deber&aacute; recibir como &uacute;nico par&aacute;metro un valor que indique la direcci&oacute;n del moviemiento de la imagen. La funci&oacute;n debe evitar que la imagen salga de los l&iacute;mites visibles de la pantalla.</p>

const initialHTML = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    </head>
    <body class="container">
        <img id="third-img" class="img-fluid position-absolute" src=${img} width="40%"/>
        <ul id="third-move" class="nav mt-4 justify-content-end position-sticky">
            <li data-direction="up" class="nav-item">
                <a href="#" class="mx-1 btn btn-dark nav-link">Up</a>
            </li>
            <li data-direction="left" class="nav-item">
                <a href="#" class="mx-1 btn btn-dark nav-link">Left</a>
            </li>
            <li data-direction="down" class="nav-item">
                <a href="#" class="mx-1 btn btn-dark nav-link">Down</a>
            </li>
            <li data-direction="right" class="nav-item">
                <a href="#" class="mx-1 btn btn-dark nav-link">Right</a>
            </li>
        </ul>
    </body>
</html>`
const initialJS = `
import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('a').click(e => e.preventDefault())
    const thirdImg = $('#third-img')
    function move(direction) {
        const {offsetHeight, offsetWidth} = document.body
        if (thirdImg.offset().top <= 0 && direction === 'up') return -1
        if (thirdImg.offset().top + thirdImg.height() >= offsetHeight)
            if (direction === 'down') return -1
        if (thirdImg.offset().left <= 0 && direction === 'left') return -1
        if (thirdImg.offset().left + thirdImg.width() >= offsetWidth)
            if(direction === 'right') return -1
        switch(direction) {
            case 'up':
                thirdImg.offset((idx, value) => {
                    return {top: value.top - 1, left: value.left}
                })
                break
            case 'left':
                thirdImg.offset((idx, value) => {
                    return {top: value.top, left: value.left - 1}
                })
                break
            case 'down':
                thirdImg.offset((idx, value) => {
                    return {top: value.top + 1, left: value.left}
                })
                break
            default :
                thirdImg.offset((idx, value) => {
                    return {top: value.top, left: value.left + 1}
                })
                break
    }
    }
    $('#third-move li').click(function() {
        move($(this).data('direction'))
    })
})`

export default ({CodeIframe}) => <CodeIframe name="events-third" initialHTML={initialHTML} initialJS={initialJS}/> 