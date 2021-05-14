export const statement = <>
<p><b>2.&ensp;</b>Crea una p&aacute;gina que solicite a lusuario el n&uacute;mero de alumnos presentes en un aula. A continuaci&oacute;n la p&aacute;gina debe solicitar el nombre y calificaci&oacute;n final de cada alumno.</p>
<p>Una vez introducidos los nombres y notas de todos los alumnos la p&aacute;gina debe mostrar el nombre del alumno con mejor calificaci&oacute;n y la media de las notas.</p>
</>
const initialHTML = `
<form id="second-form-num" class="mb-4 rounded p-2 p-sm-4 bg-light">
    <div id="second-alert-num" class="alert alert-info d-none">
        Ingrese un valor superior a 0
    </div>
    <div class="row align-items-end">
        <div class="form-group col-12 col-sm-7 col-md-6">
            <label for="second-quantity" class="text-info">
                Cantidad de estudiantes
            </label>
            <input id="second-quantity" class="form-control" type="number"/>
        </div>
        <div class="form-group col text-left">
        <button id="second-submit-num" type="submit" class="btn btn-primary" disabled>
            Enviar
        </button></div>
    </div>
</form>
<form id="second-form-student" class="mb-4 rounded p-2 p-sm-4 bg-light d-none">
    <div id="second-alert-name" class="alert alert-info d-none">
        El nombre debe tener m&iacute;nimo un caracter
    </div>
    <div id="second-alert-score" class="alert alert-info d-none">
        Llene el cuadro de calificaci&oacute;n con un n&uacute;mero
    </div>
    <div class="row align-items-end">
        <div class="form-group col">
            <label for="second-name" class="text-info">Nombre</label>
            <input id="second-name" type="text" class="form-control"/>
        </div>
        <div class="form-group col">
            <label for="second-score" class="text-info">
                Calificaci&oacute;n
            </label>
            <input id="second-score" class="form-control" type="number"/>
        </div>
    </div>
    <button id="second-submit-student" class="btn btn-primary" type="submit" disabled>
        Enviar
    </button>
</form>
<div id="second-modal" class="modal show">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header"></div>
            <div class="jumbotron">
                <h1 id="second-top-student" class="display-4">Ber&oacute;n Gamboa</h1>
                <p class="lead">Es uno de los que posee la mayor calificaci&oacute;n</p>
                <hr class="my-4"/>
                <p>
                    La media de las calificaciones enviadas es:&nbsp;
                    <b id="second-media-score"></b>
                </p>
                <button id="second-finish" class="btn btn-primary btn-lg">
                    Like &#x2661;
                </button>
            </div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>
<div id="second-backdrop" class="modal-backdrop show d-none"></div>
`
const initialJS = `
const elements = {
    modal: document.getElementById('second-modal'),
    backdrop: document.getElementById('second-backdrop'),
    formNum: document.getElementById('second-form-num'),
    formStudent: document.getElementById('second-form-student'),
    alertNum: document.getElementById('second-alert-num'),
    alertScore: document.getElementById('second-alert-score'),
    alertName: document.getElementById('second-alert-name'),
    quantity: document.getElementById('second-quantity'),
    name: document.getElementById('second-name'),
    score: document.getElementById('second-score'),
    submitNum: document.getElementById('second-submit-num'),
    submitStudent: document.getElementById('second-submit-student'),
    topStudent: document.getElementById('second-top-student'),
    mediaScore: document.getElementById('second-media-score'),
    finish: document.getElementById('second-finish')
}
const actions = {
    hideAlertNum() {
        elements.alertNum.classList.add('d-none'),
        elements.submitNum.disabled = false
    },
    hideAlertScore() {
        elements.alertScore.classList.add('d-none')
        if (elements.alertName.classList.contains('d-none'))
            elements.submitStudent.disabled = false
    },
    hideAlertName() {
        elements.alertName.classList.add('d-none')
        if (elements.alertScore.classList.contains('d-none'))
            elements.submitStudent.disabled = false
    },
    showAlertNum() {
        elements.alertNum.classList.remove('d-none'),
        elements.submitNum.disabled = true
    },
    showAlertScore() {
        elements.alertScore.classList.remove('d-none'),
        elements.submitStudent.disabled = true
    },
    showAlertName() {
        elements.alertName.classList.remove('d-none'),
        elements.submitStudent.disabled = true
    },
    hideFormNum: () => elements.formNum.classList.add('d-none'),
    hideFormStudent: () => elements.formStudent.classList.add('d-none'),
    showFormNum: () => elements.formNum.classList.remove('d-none'),
    showFormStudent: () => elements.formStudent.classList.remove('d-none'),
    reset() {
        elements.modal.classList.remove('d-block')
        elements.backdrop.classList.add('d-none')
        this.hideFormStudent()
        this.showFormNum()
        students.length = 0
    },
    showResult() {
        elements.modal.classList.add('d-block')
        elements.backdrop.classList.remove('d-none')
        let topStudent = {name: '', score: 0}
        let scoresSum = 0
        students.forEach(student => {
            const {score} = student
            scoresSum += score
            if (topStudent.score < score)
                topStudent = {...student} 
        })
        elements.topStudent.textContent = topStudent.name
        elements.mediaScore.textContent = scoresSum / students.length
    },
}
const students = []
let quantity = 0
const isNum = num => 
    num === '' || num === null || typeof num === 'boolean' || isNaN(num) ? false : true
const classListToInvalid = (classList) => {
    classList.remove('is-valid')
    classList.add('is-invalid')
}
const classListToValid = (classList) => {
    classList.add('is-valid')
    classList.remove('is-invalid')
}
elements.quantity.oninput = ({currentTarget:{classList, value}}) => {
    if (!isNum(value)) {
        actions.showAlertNum()
        classListToInvalid(classList)
    } else {
        actions.hideAlertNum()
        classListToValid(classList)
    }
}
elements.formNum.onsubmit = e => {
    e.preventDefault()
    quantity = elements.quantity.value
    elements.quantity.value = ''
    elements.quantity.classList.remove('is-valid')
    actions.showFormStudent()
    actions.hideFormNum()
}
elements.score.oninput = ({currentTarget:{classList, value}}) => {
    if (!isNum(value)) {
        actions.showAlertScore()
        classListToInvalid(classList)
    } else {
        actions.hideAlertScore()
        classListToValid(classList)
    }
}
elements.name.oninput = ({currentTarget:{classList, value}}) => {
    if (value.length > 0) {
        actions.hideAlertName()
        classListToValid(classList)
    } else {
        actions.showAlertName()
        classListToInvalid(classList)
    }
}
elements.formStudent.onsubmit = e => {
    e.preventDefault()
    students.push({name: elements.name.value, score: Number(elements.score.value)})
    quantity--
    elements.name.value = ''
    elements.score.value = ''
    elements.name.classList.remove('is-valid')
    elements.score.classList.remove('is-valid')
    if (quantity === 0)
        actions.showResult()
}
elements.finish.onclick = () => actions.reset()
`

export default ({CodeFrame}) => <CodeFrame initialHTML={initialHTML} initialJS={initialJS}/>