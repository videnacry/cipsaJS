import {memo, useState} from 'react'
import {Form, Button, Toast} from 'react-bootstrap'
import calendarSVG from './bulletin-board.svg'

let weekDay = ''
const weekendDays = ['sabado', 'domingo']
const weekDays = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
let affirmation = ''
const getAffirmation = () => {
    if (weekendDays.includes(weekDay)) {
        affirmation = '¡Es Festivo.!'
    } else if (weekDays.includes(weekDay)) {
        affirmation = '¡Es Laboral.!'
    } else {
        affirmation = ''
    }
}
export const Statement = <div>{'1. Crea una página que solicite al usuario el nombre del día de la semana. Si el valor indicado es "sabado" o "domingo", la página debe mostrar un cuadro de diálogo con el mensaje "Es Festivo.". En caso contrario debe indicarse el mensaje "Es laboral.".'}</div>
const First = memo(() => {
    const [toastDisplay, setToastDisplay] = useState(false);
    const toggleToastDisplay = () => setToastDisplay(() => !toastDisplay);
    const showToastDisplay = () => setToastDisplay(() => true)
    const [resClass, setResClass] = useState('')

    const submitHandle = () => {
        getAffirmation()
        if (affirmation === '') {
            affirmation = 'El día introducido no ha sido encontrado en nuestra lista, evite tíldes y espacios'
            setResClass(() => 'h5 text-warning')
        } else {
            affirmation === '¡Es Festivo.!' ? setResClass(() => 'h2 text-success') : setResClass(() => 'h2  text-success')
        }
        showToastDisplay()
    }

    return(
        <>
        <Form onSubmit={e => e.preventDefault()} className="bg-light p-4 rounded">
            <Form.Group>
                <Form.Label htmlFor="day">Escribe el nombre de un día de la semana, te decimos festivo si es sabado o domingo!</Form.Label>
                <Form.Control id="day" type="text" placeholder="lunes" onChange={e => weekDay = e.currentTarget.value.toLowerCase()}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="submit" as={Button} variant="primary" onClick={(submitHandle)}>Enviar</Form.Control>
            </Form.Group>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
          <Toast show={toastDisplay} onClose={toggleToastDisplay} className="align-self-center">
            <Toast.Header>
              <img src={calendarSVG} width="30px" className="rounded mr-2" alt="image of a calendar" />
              <strong className="mr-auto">Respuesta</strong>
              <small>Like &#x2661;</small>
            </Toast.Header>
            <Toast.Body>
                <p className={resClass}>{affirmation}</p>
                <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Toast.Body>
          </Toast>
        </div>
        </>
    )
})

export default First