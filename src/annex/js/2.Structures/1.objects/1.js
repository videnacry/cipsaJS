

export const statement = <>
    <p><b>1.</b>{'Sea un tipo de objeto '}<em>Usuario</em>{' provisto de dos propiedades: '}<em>usuario</em>&nbsp;y&nbsp;<em>clave</em>{' que define además un método '}<em>comprobarClave()</em>{' que recibe dos parámetros (usuario y clave) y devuelve un valor cierto si ambos coinciden con el nombre del usuario y su contraseña:'}</p>
    <pre>
{`function Usuario(_usuario, _clave) {
    this.usuario = _usuario;
    this.clave = _clave;
    this.comprobarUsuario = function(_usu, _cla) {
        if (this.usuario == _usu && this.clave == _cla) {
            return true;
        } else {
            return false;
        }
    }
}`}</pre>
        <p>{'Crea una página que cree a su vez un objeto '}<em>Usuario</em>{' con nombre '}<em>"roger"</em>{' y clave: '}<em>1234.</em>{' La página debe solicitar entonces un nombre de usuario y una contraseña y comprobar si son correctos empleando el método '}<em>comprobarUsuario()</em>{' del objeto usuario. Si el usuario se identifica correctamente debe mostrársele un mensaje de bienvenida. En caso contrario debe mostrársele un mensaje de error y volvérsele a solicitar el usuario y la contraseña.'}</p>
</>

const initialJs = `
const User = (name, password) => { return {
    name,
    password,
    isValid(_name, _password) {
        if (this.name === _name && this.password === _password)
        return true
        return false
    }
}}
const user = User('roger', '1234')
const userInput = document.querySelector('#first-username')
const passwordInput = document.querySelector('#first-password')
const alertElmt = document.querySelector('#first-alert')
const message = document.querySelector('#first-message')

const actions = {
    showMessage: () => message.classList.remove('d-none'),
    hideMessage: () => message.classList.add('d-none'),
    showAlert: () => alertElmt.classList.remove('d-none'),
    hideAlert: () => alertElmt.classList.add('d-none'),
    isValid: () => user.isValid(userInput.value, passwordInput.value)
}

const hideMessageBtn = document.querySelector('#first-hide-message')
hideMessageBtn.onclick = () => actions.hideMessage()
const form = document.querySelector('#first-form')
form.onsubmit = e => {
    e.preventDefault()
    if (actions.isValid()) {
        actions.hideAlert()
        actions.showMessage()
    } else {
        actions.hideMessage()
        actions.showAlert()
    }
}
`

const initialHTML = `
<form id="first-form" class="rounded p-2 p-sm-4 form bg-light">
    <p class="alert alert-danger d-none" id="first-alert">
        El nombre de usuario o contrase&ntilde;a es incorrecto
    </p>
    <div class="row align-items-end">
        <div class="form-group col">
            <label for="first-username" class="text-info">Nombre de usuario</label>
            <input id="first-username" class="form-control" type="text"/>
        </div>
        <div class="form-group col">
            <label for="first-password" class="text-info">Contrase&ntilde;a</label>
            <input id="first-password" class="form-control" type="password"/>
        </div>
    </div>
    <button type="submit" class="btn btn-primary ml-auto">Enviar</button>
</form>
<br/>
<div id="first-message" class="toast show m-auto d-none">
  <div class="toast-header">
    <strong class="mr-auto">Mensaje</strong>
    <small>Like &#x2661</small>
    <button id="first-hide-message" type="button" class="ml-2 mb-1 close">
        <span>&times;</span>
    </button>
  </div>
  <div class="toast-body">
    <div class="alert alert-success"> Bienvenido!.</div>
  </div>
</div>
`

export default ({CodeFrame}) => {
    return <CodeFrame initialHTML={initialHTML} initialJs={initialJs}/>
}