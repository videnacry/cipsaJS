export const statement = <ol class="list-unstyled">
    <b>3.&ensp;</b>{'Crea un tipo de objeto '}<en>Tri&aacute;ngulo</en>{' provisto de tres propiedades: '}<em>lado1, lado2&nbsp;</em>y<em>&nbsp;lado3.</em>&nbsp;Define adem&aacute;s tres m&eacute;todos:
    <li>&emsp;a.&ensp;<em>esEquilatero() ⟶&nbsp;</em>{'devuelve un valor cierto si todos los lados son iguales.'}</li>
    <li>&emsp;b.&ensp;<em>esIsosceles() ⟶&nbsp;</em>{'devuelve un valor cierto si dos de los lados son iguales.'}</li>
    <li>&emsp;c.&ensp;<em>esEscaleno() ⟶&nbsp;</em>{'devuelve un valor cierto si todos los lados son distintos.'}</li>
    <br/>
    <p>Crea una p&aacute; que solicite los tres lados de un tri&aacute;ngulo, creee un objeto tri&aacute;ngulo, y despu&eacute;s indique si es equil&aacute;tero, is&oacute;sceles o excaleno llamando a sus m&eacute;todos.</p>
</ol>

const initialHTML = `
<form id="third-form" class="mb-4 rounded p-2 p-sm-4 bg-light">
    <div id="third-alert" class="alert alert-info d-none">
        Llena todos los casilleros
    </div>
    <div class="row align-items-end text-center px-2 px-sm-4">
        <div class="form-group col-4 px-1 px-sm-2 px-md-3">
            <label class="text-info">lado1</label>
            <input class="form-control" type="number">
        </div>
        <div class="form-group col-4 px-1 px-sm-2 px-md-3">
            <label class="text-info">lado2</label>
            <input class="form-control" type="number">
        </div>
        <div class="form-group col-4 px-1 px-sm-2 px-md-3">
            <label class="text-info">lado3</label>
            <input class="form-control" type="number">
        </div>
    </div>
    <button id="third-submit" type="submit" class="btn btn-primary" disabled>
        Enviar
    </button>
</form>
<div id="third-toast" class="toast show m-auto d-none">
    <div class="toast-header">
        <strong class="mr-auto">Mensaje</strong>
        <small>Like &#x2661;</small>
        <button id="third-close" class="btn close ml-2 mb-1"><span>&times;</span></button>
    </div>
    <div class="toast-body">
        <div id="third-message" class="alert alert-success"></div>
    </div>
</div>
<br/>
`
const initialJS = `
const Triangulo = (lado1, lado2, lado3) => {return {
    lado1, lado2, lado3,
    esEquilatero() {
        return (this.lado1 === this.lado2 && this.lado2 === this.lado3) ? true : false
    },
    esIsosceles() {
        return (!this.esEquilatero() && !this.esEscaleno()) ? true : false
    },
    esEscaleno() {
        const {lado1, lado2, lado3} = this
        return (lado1 !== lado2 && lado2 !== lado3 && lado1 !== lado3) ? true : false
    }
}}

const elements = {
    form: document.getElementById('third-form'),
    submit: document.getElementById('third-submit'),
    alert: document.getElementById('third-alert'),
    toast: document.getElementById('third-toast'),
    close: document.getElementById('third-close'),
    message: document.getElementById('third-message'),
    numbers: document.querySelectorAll('#third-form input[type=number]')
}
const actions = {
    hideAlert() {
        elements.submit.disabled = false
        elements.alert.classList.add('d-none')
    },
    showAlert() {
        elements.submit.disabled = true
        elements.alert.classList.remove('d-none')
    },
    showMessage() {
        elements.toast.classList.remove('d-none')
        const {numbers} = elements
        const myTriangle = Triangulo(numbers[0].value, numbers[1].value, numbers[2].value)
        let triangleType = ''
        if (myTriangle.esEquilatero()) triangleType = 'equilatero'
        if (myTriangle.esIsosceles()) triangleType = 'isosceles'
        if (myTriangle.esEscaleno()) triangleType = 'escaleno'
        elements.message.textContent = 'El triángulo es: ' + triangleType
    },
    hideMessage: () => elements.toast.classList.add('d-none')
}
const isNum = (num) => (num === '' || num === null || typeof num === 'boolean' || isNaN(num)) ? false : true
elements.close.onclick = () => actions.hideMessage()
elements.form.onsubmit = e => {
    e.preventDefault()
    actions.showMessage()
}
elements.numbers.forEach(num => {
    num.onchange = ({currentTarget: {value, classList}}) => {
        actions.hideMessage()
        let validInputs = true
        for (let idx = 0; elements.numbers.length > idx; idx++) {
            if (!isNum(elements.numbers[idx].value)) {
                validInputs = false
                break
            }
        }
        validInputs ? actions.hideAlert() : actions.showAlert()

        if (!isNum(value)) {
            classList.add('is-invalid')
            classList.remove('is-valid')
        } else {
            classList.add('is-valid')
            classList.remove('is-invalid')
        }
    }
})
`

export default ({CodeFrame}) => <CodeFrame initialHTML={initialHTML} initialJS={initialJS}/>