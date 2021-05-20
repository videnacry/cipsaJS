import appleImg from './apple.svg'
import lemonImg from './lemon.svg'
import tomatoImg from './tomato.svg'
import orangeImg from './orange.svg'

export const forms = {
    name: 'forms',
    type: 'module'
}

const statement = <>
<p>Crea una p&aacute;gina web provista de un formulario para realizar compras online para una fruteria. El formulario debe contener los siguientes controles:</p>
<ul>
    <li>1 caja de texto para el nombre del comprador.</li>
    <li>1 lista con las siguientes opciones: "Naranjas", "Manzanas", "Limones", "Tomates".</li>
    <li>2 botones de opci&oacute;n <em>&lt;option&gt;</em>: <em>"VISA"</em> y <em>"MASTERCARD"</em>.</li>
    <li>1 caja de texto para el peso en kilos.</li>
    <li>1 boton con el texto <em>"Calcular"</em></li>
</ul>
<p>El usuarios debe introducir obligaroriamente un nombre, seleccionar una fruta, una opci&oacute; de compra e indicar el peso mediante un valor num&eacute;rico v&aacute;lido entre 0 y 10Kg.</p>
<p>Cuando el usuario pulse el bot&oacute;n de env&iacute;o debe calcularse y mostrarse el importe total de la compra seg&uacute;n los siguientes precios estipulados:</p>
<ul>
    <li>Naranjas: 3€ /kg</li>
    <li>Limones: 2.25€ /kg</li>
    <li>Manzanas: 2.50€ /kg</li>
    <li>Tomates: 4.25€ /kg</li>
</ul>
<p>Si el usuario compra m&aacute;s de 5 Kg se le aplica un descuento por volumen de compra del 4% si paga con VISA, y del 2.5% si es MASTERCARD</p>
</>

const initialHTML = `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    </head>
    <body class="container">
        <form class="p-4">
            <div class="card container mb-4">
                <div class="row align-items-stretch">
                    <div class="col-3 p-2 p-sm-3 d-flex align-items-center bg-light">
                        <img class="card-img-top img-fluid m-auto" src="${appleImg}"/>
                    </div>
                    <div class="card-body col-9">
                        <h1 class="card-title lead">Manzana</h1>
                        <p>
                            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="alert alert-info d-none"></div>
                        <div class="input-group">
                            <div class="form-floating form-control p-0">
                                <input class="form-control border-0" type="number" placeholder="0"/>
                                <label class="text-secondary">
                                    N&uacute;mero entre 0 y 10
                                </label>
                            </div>
                            <span class="input-group-text">Kg</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card container mb-4">
                <div class="row align-items-stretch">
                    <div class="col-3 p-2 p-sm-3 d-flex align-items-center bg-light">
                        <img class="card-img-top img-fluid m-auto" src="${lemonImg}"/>
                    </div>
                    <div class="card-body col-9">
                        <h1 class="card-title lead">Lim&oacute;n</h1>
                        <p>
                            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="alert alert-info d-none"></div>
                        <div class="input-group">
                            <div class="form-floating form-control p-0">
                                <input class="form-control border-0" type="number" placeholder="0"/>
                                <label class="text-secondary">
                                    N&uacute;mero entre 0 y 10
                                </label>
                            </div>
                            <span class="input-group-text">Kg</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card container mb-4">
                <div class="row align-items-stretch">
                    <div class="col-3 p-2 p-sm-3 d-flex align-items-center bg-light">
                        <img class="card-img-top img-fluid m-auto" src="${tomatoImg}"/>
                    </div>
                    <div class="card-body col-9">
                        <h1 class="card-title lead">Tomate</h1>
                        <p>
                            <div>Iconos diseñados por <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="alert alert-info d-none"></div>
                        <div class="input-group">
                            <div class="form-floating form-control p-0">
                                <input class="form-control border-0" type="number" placeholder="0"/>
                                <label class="text-secondary">
                                    N&uacute;mero entre 0 y 10
                                </label>
                            </div>
                            <span class="input-group-text">Kg</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card container mb-4">
                <div class="row align-items-stretch">
                    <div class="col-3 p-2 p-sm-3 d-flex align-items-center bg-light">
                        <img class="card-img-top img-fluid m-auto" src="${orangeImg}"/>
                    </div>
                    <div class="card-body col-9">
                        <h1 class="card-title lead">Naranja</h1>
                        <p>
                            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                        </p>
                    </div>
                    <div class="card-footer">
                        <div class="alert alert-info d-none"></div>
                        <div class="input-group">
                            <div class="form-floating form-control p-0">
                                <input class="form-control border-0" type="number" placeholder="0"/>
                                <label class="text-secondary">
                                    N&uacute;mero entre 0 y 10
                                </label>
                            </div>
                            <span class="input-group-text">Kg</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="alert alert-info d-none"></div>
                <div class="form-floating mb-4">
                    <input class="form-control" type="text" placeholder="Sabrina"/>
                    <label class="text-secondary">Nombre de usuario</label>
                </div>
            </div>
            <div class="form-floating mb-4">
                <select class="form-select">
                    <option>VISA</option>
                    <option>MASTERCARD</option>
                </select>
                <label class="text-secondary">Tipo de targeta</label>
            </div>
            <button id="forms-submit" type="submit" class="btn btn-primary" disabled>
                Enviar
            </button>
        </form>
        <div class="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header"></div>
                    <div class="modal-body bg-secondary text-white">
                        <h1 class="display-1">Gracias</h1>
                        <p class="lead">El valor total es de 20</p>
                        <hr class="my-2"/>
                        <p>Ha sido un placer atenderlo berón gamboa</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary">Like &#x2661</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-backdrop show d-none"></div>
    </body>
</html>
`
const initialJS = `
const state = {
    validInputs: {
        Manzana: false,
        Limón: false,
        Naranja: false,
        Tomate: false
    },
    amounts: {
        Manzana: 0,
        Limón: 0,
        Naranja: 0,
        Tomate: 0
    },
    validName: false,
}
const prices = {
    Manzana: 2.5,
    Limón: 2.25,
    Naranja: 3,
    Tomate: 4.25
}
const discountPercentages = {
    VISA: 4,
    MASTERCARD: 2.5
}

const isNum = num =>
    num === '' || num === null || typeof num === 'boolean' || isNaN(num) ? false : true

import('https://code.jquery.com/jquery-3.6.0.slim.min.js').then(() => {
    $('.card input[type=number]').on('input', function(idx){
        const card = $(this).closest('.card')
        const inputName = card.find('.card-title').text()
        if (isNum(this.value) && this.value <= 10 && this.value >= 0) {
            card.find('.alert').addClass('d-none')
            state.validInputs[inputName] = true
            state.amounts[inputName] = this.value
        } else {
            card.find('.alert').text('El valor establecido no es válido.').removeClass('d-none')
            state.validInputs[inputName] = false
            state.amounts[inputName] = 0
        }
        if (Object.values(state.validInputs).includes(true) && state.validName === true)
            $('form button:submit').prop('disabled', false)
    })
    $('form input:text').on('input', function() {
        const alert = $(this).closest('.form-group').find('.alert')
        if (!this.value.length > 0) {
            alert.removeClass('d-none').text('El nombre debe contenter mínimo un caracter')
        } else {
            alert.addClass('d-none')
            state.validName = true
        }
        if (Object.values(state.validInputs).includes(true) && state.validName === true)
            $('form button:submit').prop('disabled', false)
    })
    $('form').submit(e => e.preventDefault())
    $('form button:submit').click(function() {
        const discountPercentage = discountPercentages[$('form select').val()]
        const amount = state.amounts
        let totalPrice = 0
        for (let idx in amount) {
            const price = amount[idx] * prices[idx]
            const discount = amount[idx] > 5 ? (price * discountPercentage)/100 : 0
            totalPrice += price - discount
        }
        $('.modal').addClass('d-block')
        $('.modal-backdrop').removeClass('d-none')
        $('.modal-body .lead').text('El valor total de su compra es de: ' + totalPrice + '€')
        $('.modal-body p:not(.lead)').text('Ha sido un placer servirle ' + $('form input:text').val())
    })
    $('.modal-footer button').click(function() {
        $('.modal').removeClass('d-block')
        $('.modal-backdrop').addClass('d-none')
    })
})
`

export default ({CodeIframe}) =>
    <div className="mb-4 rounded p-2 p-sm-4 bg-secondary">
        <div className="alert alert-info">{statement}</div>
        <CodeIframe name="forms" initialHTML={initialHTML} initialJS={initialJS}/>
    </div>