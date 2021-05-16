export const statement = <>
<p><b>3.&ensp;</b>Crea una p&aacute;gina para registrar las precipieaciones registradas por meses. Para ello la p&aacute;gina debe solicitar el nombre de un mes y unas precipitaciones en litros. A continuaci&oacute;n la p&aacute;gina debe mostrar un cuadro de di&aacute;logo preguntado si el usuario desea registrar m&aacute;s precipitaciones. Las precipitaciones asociadas a los mismos meses deben acumularse.</p>
<p>Una vez que el usuario termine la p&aacute;gina debe mostrar una tabla con todos los meses y el acumulado de precipitaciones ocrrespondiente a cada uno de llos.</p>
</>

const initialHTML = `
<form id="third-form" class="mb-4 rounded p-2 p-sm-4 bg-light">
    <div class="row align-items-end">
        <div class="col form-group">
            <label for="third-dropdown-toggle" class="text-info">Seleccione el mes</label>
            <div id="third-dropdown" class="btn-group form-control py-0 pl-0 is-invalid">
                <button id="third-dropdown-selected" class="btn btn-secondary" disabled>
                    Mes del a&ntilde;o
                </button>
                <button id="third-dropdown-toggle" class="dropdown-toggle btn btn-secondary">
                </button>
                <div id="third-dropdown-menu" class="dropdown-menu">
                    <button class="dropdown-item" value="jan">Enero</button>
                    <button class="dropdown-item" value="feb">Ferbrero</button>
                    <button class="dropdown-item" value="mar">Marzo</button>
                    <button class="dropdown-item" value="apr">Abril</button>
                    <button class="dropdown-item" value="may">Mayo</button>
                    <button class="dropdown-item" value="jun">Junio</button>
                    <button class="dropdown-item" value="jul">Julio</button>
                    <button class="dropdown-item" value="aug">Agosto</button>
                    <button class="dropdown-item" value="sep">Septiembre</button>
                    <button class="dropdown-item" value="oct">Octubre</button>
                    <button class="dropdown-item" value="nov">Noviembre</button>
                    <button class="dropdown-item" value="dec">Diciembre</button>
                </div>
            </div>
        </div>
        <div class="col form-group">
            <label for="third-input" class="text-info">
                N&uacute;mero de litros
            </label>
            <input id="third-input" type="number" class="form-control is-invalid"/>
        </div>
    </div>
    <button id="third-submit" class="btn btn-primary" type="submit" disabled>
        Enviar
    </button>
</form>
<div id="third-toast" class="toast show d-none m-auto">
    <div class="toast-header">
        <strong class="mr-auto">Registro de precipitaciones</strong>
        <small>Like &#x2661;</small>
        <button id="third-close" class="mb-2 ml-2 btn close">&times;</button>
    </div>
    <div class="toast-body">
        <div class="alert alert-success">
            <table id="third-table" class="table table-borderless"></table>
        </div>
    </div>
</div>
<br/>
<div id="third-modal" class="modal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header"></div>
            <div class="modal-body bg-light">
                <p class="lead">
                    ¿ Desea registrar m&aacute;s precipitaciones ?
                </p>
            </div>
            <div class="modal-footer">
                <button id="third-cancel" class="btn btn-secondary">denegar</button>
                <button id="third-accept" class="btn btn-primary">afirmar</button>
            </div>
        </div>
    </div>
</div>
<div id="third-backdrop" class="modal-backdrop show d-none"></div>
`
const initialJS = `
const elements = {
    form: document.getElementById('third-form'),
    dropdown: document.getElementById('third-dropdown'),
    dropdownSelected: document.getElementById('third-dropdown-selected'),
    dropdownToggle: document.getElementById('third-dropdown-toggle'),
    dropdownMenu: document.getElementById('third-dropdown-menu'),
    dropdownItems: document.querySelectorAll('#third-form .dropdown-item'),
    input: document.getElementById('third-input'),
    submit: document.getElementById('third-submit'),
    modal: document.getElementById('third-modal'),
    accept: document.getElementById('third-accept'),
    cancel: document.getElementById('third-cancel'),
    backdrop: document.getElementById('third-backdrop'),
    toast: document.getElementById('third-toast'),
    close: document.getElementById('third-close'),
    table: document.getElementById('third-table')
}
const isNum = num =>
    num === '' || num === null || typeof num === 'boolean' || isNaN(num) ? false : true
const actions = {
    toggleDropdownMenu: () => elements.dropdownMenu.classList.toggle('show'),
    changeMonth(e) {
        elements.dropdownSelected.textContent = e.currentTarget.textContent
        elements.dropdownSelected.value = e.currentTarget.value
        elements.dropdown.classList.add('is-valid')
        elements.dropdown.classList.remove('is-invalid')
        state.validMonth = true
        actions.toggleDropdownMenu()
        elements.submit.disabled = state.validLiters ? false : true
    },
    changeLiters({currentTarget:{classList, value}}) {
        if (isNum(value)) {
            classList.add('is-valid')
            classList.remove('is-invalid')
            state.validLiters = true
            elements.submit.disabled = state.validMonth ? false : true
        } else {
            classList.add('is-invalid')
            classList.remove('is-valid')
            state.validLiters = false
            elements.submit.disabled = true
        }
    },
    addPrecipitation() {
        state.months[elements.dropdownSelected.value].precipitations.push(elements.input.value)
        actions.resetForm()
        actions.toggleModal()
    },
    resetForm() {
        const input = elements.input, dropdown = elements.dropdown
        input.value = ''
        input.classList.add('is-invalid')
        input.classList.remove('is-valid')
        dropdown.classList.add('is-invalid')
        dropdown.classList.remove('is-valid')
        elements.dropdownSelected.value = ''
        elements.dropdownSelected.textContent = 'Mes del año'
        elements.submit.disabled = true
        actions.resetState()
    },
    toggleModal() {
        elements.modal.classList.toggle('d-block')
        elements.backdrop.classList.toggle('d-none')
    },
    addMore() {
        actions.toggleModal()
    },
    showToast: () => elements.toast.classList.remove('d-none'),
    hideToast: () => elements.toast.classList.add('d-none'),
    showTable() {
        actions.toggleModal()
        actions.showToast()
        let html = ''
        for (let idx in state.months) {
            html += '<tr><th scope="row">' + state.months[idx].name + '</th>'
            state.months[idx].precipitations.forEach(liters => {
                html += '<td>' + liters + '</td>'
            })
            html += '</tr>'
            state.months[idx].precipitations.length = 0
        }
        elements.table.innerHTML = html
        actions.resetState()
    },
    resetState: () => state = {...initialState}
}
const initialState = {
    validMonth: false,
    validLiters: false,
    months: {
        jan: {
            name: 'January',
            precipitations: [],
        },
        feb: {
            name: 'Ferbrero',
            precipitations: [],
        },
        mar: {
            name: 'March',
            precipitations: [],
        },
        apr: {
            name: 'April',
            precipitations: [],
        },
        may: {
            name: 'May',
            precipitations: [],
        },
        jun: {
            name: 'June',
            precipitations: [],
        },
        jul: {
            name: 'July',
            precipitations: [],
        },
        aug: {
            name: 'August',
            precipitations: [],
        },
        sep: {
            name: 'September',
            precipitations: [],
        },
        oct: {
            name: 'October',
            precipitations: [],
        },
        nov: {
            name: 'November',
            precipitations: [],
        },
        dec: {
            name: 'December',
            precipitations: []
        }
    }
}
let state = {...initialState}
elements.dropdownToggle.onclick = actions.toggleDropdownMenu
elements.dropdownItems.forEach(item => {
    item.onclick = actions.changeMonth
})
elements.input.oninput = actions.changeLiters
elements.form.onsubmit = e => {
    e.preventDefault()
}
elements.submit.onclick = actions.addPrecipitation
elements.accept.onclick = actions.addMore
elements.cancel.onclick = actions.showTable
elements.close.onclick = actions.hideToast
`

export default ({CodeFrame}) => <CodeFrame initialHTML={initialHTML} initialJS={initialJS}/>