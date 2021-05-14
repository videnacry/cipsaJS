export const statement = <p><b>2.&ensp;</b>{'Crea un tipo de objeto '}<em>ApuestaPrimitiva</em>{' provisto de seis propiedades que representan los valores de una primitiva: v1, v2, v3, v4, v5. Define además un método '}<em>contarAciertos()</em>{' que recibe como parámetros seis valores de la combinación ganadora y devuelve el número de aciertos.'}</p>

const initialHTML = `
    <form id="second-form" class="mb-4 rounded p-2 p-sm-4 bg-light">
        <div id="second-alert" class="alert alert-info d-none">Ingrese otro valor num&eacute;rico</div>
        <h1 class="h6 text-secondary">Valores para apuesta primitiva</h1>
        <div class="row">
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v1" class="text-info">v1</label>
                <input id="second-v1" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v2" class="text-info">v2</label>
                <input id="second-v2" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v3" class="text-info">v3</label>
                <input id="second-v3" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v4" class="text-info">v4</label>
                <input id="second-v4" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v5" class="text-info">v5</label>
                <input id="second-v5" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v6" class="text-info">v6</label>
                <input id="second-v6" class="form-control col" type="number"/>
            </div>
        </div>
        <hr/>
        <h1 class="h6 text-secondary">Valores ganadores</h1>
        <div class="row">
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v1-winer" class="text-info">v1</label>
                <input id="second-v1-winer" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v2-winer" class="text-info">v2</label>
                <input id="second-v2-winer" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v3-winer" class="text-info">v3</label>
                <input id="second-v3-winer" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v4-winer" class="text-info">v4</label>
                <input id="second-v4-winer" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v5-winer" class="text-info">v5</label>
                <input id="second-v5-winer" class="form-control col" type="number"/>
            </div>
            <div class="col-6 col-sm-4 col-md-3 form-group text-center">
                <label for="second-v6-winer" class="text-info">v6</label>
                <input id="second-v6-winer" class="form-control col" type="number"/>
            </div>
        </div>
        <button id="second-submit" type="submit" disabled class="btn btn-primary">Enviar</button>
    </form>
    <div id="second-toast" class="toast show m-auto d-none">
        <div class="toast-header">
            <strong class="mr-auto">N&uacute;mero de aciertos</strong>
            <small>Like &#x2661;</small>
            <button id="second-close" class="btn close"><span>&times;</span></button>
        </div>
        <div class="toast-body">
            <div id="second-hits" class="alert alert-success"></div>
        </div>
    </div>
    <br/>
`
const initialJS = `
const ApuestaPrimitiva = (v1, v2, v3, v4, v5, v6) => { return {
    v1, v2, v3, v4, v5, v6, 
    contarAciertos(...values) {
        const myValues = [this.v1, this.v2, this.v3, this.v4, this.v5, this.v6]
        values.length = 6
        let hits = 0
        myValues.forEach((val, idx) => {
            hits = val === values[idx] ? hits + 1 : hits
        })
        return hits
    }
}}

const valuesInput = [
    document.getElementById('second-v1'),
    document.getElementById('second-v2'),
    document.getElementById('second-v3'),
    document.getElementById('second-v4'),
    document.getElementById('second-v5'),
    document.getElementById('second-v6')
]

const valuesInputWin = [
    document.getElementById('second-v1-winer'),
    document.getElementById('second-v2-winer'),
    document.getElementById('second-v3-winer'),
    document.getElementById('second-v4-winer'),
    document.getElementById('second-v5-winer'),
    document.getElementById('second-v6-winer')
]

const elements = {
    hits: document.getElementById('second-hits'),
    toast: document.getElementById('second-toast'),
    close: document.getElementById('second-close'),
    submit: document.getElementById('second-submit'),
    form: document.getElementById('second-form'),
    alert: document.getElementById('second-alert'),
    numbers: document.querySelectorAll('#second-form input.form-control[type=number]')
}

const actions = {
    hideAlert: () => {
        elements.submit.disabled = false
        elements.alert.classList.add('d-none')
    },
    showAlert: () => {
        elements.submit.disabled = true
        elements.alert.classList.remove('d-none')
    },
    hideHits: () => elements.toast.classList.add('d-none'),
    showHits: () => {
        const values = valuesInput.map(val => val.value)
        const myBet = ApuestaPrimitiva(...values)
        const winValues = valuesInputWin.map(win => win.value)
        const hits = myBet.contarAciertos(...winValues)
        elements.hits.textContent = 'Los aciertos son: ' + hits
        elements.toast.classList.remove('d-none')
    }
}
const isNum = (num) => 
    (num === "" || num === null || typeof num === 'boolean' || isNaN(num)) ? false : true

elements.numbers.forEach(elmt => {
    elmt.oninput = ({currentTarget: {value, classList}}) => {
        actions.hideHits()
        let validNumbers = true
        for (let idx in valuesInput) {
            if (!isNum(valuesInput[idx].value) || !isNum(valuesInputWin[idx].value)) {
                validNumbers = false
                break
            }
        }
        (validNumbers) ? actions.hideAlert() : actions.showAlert()
        if (isNum(value)) {
            classList.add('is-valid')
            classList.remove('is-invalid')
        } else {
            classList.remove('is-valid')
            classList.add('is-invalid')
        }
    }
})
elements.close.onclick = () => actions.hideHits()
elements.form.onsubmit = e => {
    e.preventDefault()
    actions.showHits()
}
`
export default ({CodeFrame}) => {
    return <CodeFrame initialHTML={initialHTML} initialJS={initialJS}/>
}
