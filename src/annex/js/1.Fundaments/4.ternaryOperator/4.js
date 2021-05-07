import {memo, useCallback, useReducer} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import christmasSVG from './navidad.svg'

export const Statement = <p><b>4.</b>{' Crea una página que solicite al usuario el nombre del mes y día actual. Si el usuario introduce el día 25 de "diciembre" deberá mostrarse el mensaje "Es Navidad".'}</p>
const toast = {
    show: false,
    greet: ''
}
function toastReducer(state, {type}) {
    switch (type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'settleGreet': return {...state, greet: getGreet()}
    }
}
function getGreet({month, day} = date, {month: pMonth, day: pDay} = userDate) {
    if (month.toLowerCase() === pMonth) {
        if (Number(day) === Number(pDay)) return <span className="text-success">Es Navidad.</span>
    }
    return <span className="text-success">Fel&iacute;z d&iacute;a.</span>
}
const date = {month: 'diciembre', day: '25'}
const userDate = {month: '', day: ''}

const Fourth = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(() => {
        toastDispatch({type: 'settleGreet'})
        toastDispatch({type: 'show'})
    })
    return(
        <>
        <Form onSubmit={e => e.preventDefault()} className="p-4 rounded bg-light">
            <Form.Group>
                <Form.Label htmlFor="fourth-month">Ingrese un mes</Form.Label>
                <Form.Control id="fourth-month" type="text" onChange={e => userDate.month = e.currentTarget.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="fourth-day">{'Ingrese el número de día'}</Form.Label>
                <Form.Control id="fourth-day" type="number" min="0" max="31" onChange={e => userDate.day = e.currentTarget.value}/>
            </Form.Group>
            <Form.Control type="submit" as={Button} variant="primary" onClick={submitHandler}>Enviar</Form.Control>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: "hide"})}>
                <Toast.Header>
                    <img src={christmasSVG} width="30px" alt="christmas tree img" className="mr-2"/>
                    <strong className="mr-auto">Greeting</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{toastState.greet}</p>
                    <div>Iconos diseñados por <a href="" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default Fourth