export const statement = <ol class="list-unstyled">
    <b>1.&ensp;</b>Crea una p&aacute;gina que solicite el nombre de los socios de una peña. Para ello, la p&aacute;gina solicitar&aacute; cada nombre y a continuaci&oacute;n mostrar&aaute; un cuadro de di&aacute;logo preguntando si se desea continuar. Una vez que el usuario haya finalizado de introducir todos los nombres la p&aacute;gina debe mostrar los siguientes datos:
    <li class="ml-4">a.&ensp;Una tabla con los nombres de los socios en el orden en que se han introducido</li>
    <li class="ml-4">b.&ensp;Una tabla con los nombres de los socios ordenados alfab&eacute;ticamente.</li>
    <li class="ml-4">c.&ensp;El total de socios introducidos.</li>
</ol>

const initialHTML = `
<form id="first-form" class="mb-4 rounded p-2 p-sm-4 bg-light">
    <div id="first-alert" class="alert alert-info d-none">
        Asegurese que el nombre tenga m&iacute;nimo un caracter
    </div>
    <div class="form-group">
        <label for="first-input" class="text-info">Nombre del socio</label>
        <input id="first-input" type="text" class="form-control"/>
    </div>
    <button id="first-submit" type="submit" class="btn btn-primary" disabled>
        Enviar
    </button>
</form>
<div id="first-toast" class="toast show m-auto d-none">
    <div class="toast-header">
        <strong class="mr-auto">Tabla</strong>
        <small>Like &#x2661;</small>
        <button id="first-close" class="btn close mr-2 mb-2"><span>&times;</span></button>
    </div>
    <div class="toast-body">
        <div class="alert alert-success">
            <table class="table table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Por entrada</th>
                        <th scope="col">Por alfabero</th>
                    </tr>
                </thead>
                <tbody id="first-tbody"></tbody>
            </table>
        </div>
    </div>
</div>
<br/>
<div id="first-modal" class="modal show">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-secondary">
                    Dialog box
                </h5>
            </div>
            <div class="modal-body bg-light">
                <p class="h6">¿Desea ingresar un nuevo socio?</p>
            </div>
            <div class="modal-footer">
                <button id="first-deny" class="btn btn-secondary btn-sm">No</button>
                <button id="first-accept" class="btn btn-primary btn-sm">Sip</button>
            </div>
        </div>
    </div>
</div>
<div id="first-backdrop" class="modal-backdrop show d-none"></div>
`
const initialJS = `
const elements = {
    alert: document.getElementById('first-alert'),
    form: document.getElementById('first-form'),
    input: document.getElementById('first-input'),
    submit: document.getElementById('first-submit'),
    toast: document.getElementById('first-toast'),
    close: document.getElementById('first-close'),
    modal: document.getElementById('first-modal'),
    accept: document.getElementById('first-accept'),
    deny: document.getElementById('first-deny'),
    backdrop: document.getElementById('first-backdrop'),
    tbody: document.getElementById('first-tbody')
}
const actions = {
    hideAlert() {
        elements.alert.classList.add('d-none')
        elements.submit.disabled = false
    },
    showAlert() {
        elements.alert.classList.remove('d-none')
        elements.submit.disabled = true
    },
    addMember() {
        const {value} = elements.input
        if (value.length > 0) {
            this.hideAlert()
            members.push(value)
            elements.input.value = ''
            elements.input.classList.remove('is-valid')
            this.showModal()
            elements.submit.disabled = true
        } else {
            this.showAlert()
        }
    },
    showModal() {
        elements.modal.classList.add('d-block')
        elements.backdrop.classList.remove('d-none')
    },
    hideModal() {
        elements.modal.classList.remove('d-block')
        elements.backdrop.classList.add('d-none')
    },
    hideToast: () => elements.toast.classList.add('d-none'),
    showMembers() {
        console.log(this)
        this.hideModal()
        elements.toast.classList.remove('d-none')
        const alphabeticMembers = [...members].sort()
        let html = ''
        alphabeticMembers.forEach((member, idx) => {
            html += '<tr><td>' + members[idx] + '</td><td>' + member + '</td></tr>'
        })
        elements.tbody.innerHTML = html
        members.length = 0
        elements.submit.disabled = true
    }
}
const members = []
elements.input.onchange = ({currentTarget: {classList, value}}) => {
    actions.hideToast()
    if (value.length > 0) {
        actions.hideAlert()
        classList.add('is-valid')
        classList.remove('is-invalid')
    } else {
        actions.showAlert()
        classList.add('is-invalid')
        classList.remove('is-valid')
    }
}
elements.form.onsubmit = e => {
    e.preventDefault()
    actions.addMember()
}
elements.deny.onclick = () => actions.showMembers()
elements.accept.onclick = () => actions.hideModal()
elements.close.onclick = () => actions.hideToast()
`

export default ({CodeFrame}) => <CodeFrame initialHTML={initialHTML} initialJS={initialJS}/>