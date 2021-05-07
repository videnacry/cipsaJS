import {memo, useCallback, useReducer} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import numbersSVG from './numeros.svg'

export const Statement = <p><b>5.</b>{' Crea una página que solicite al usuario un valor numérico. Si el valor introducido es múltiplo de 2 deberá mostrarse el mensaje "El número es par". En caso contrario deberá mostrarse el mensaje "El número es impar".'}</p>

function getProperty(num = number) {
    if (num === '') {
        return <span className="text-danger">Sorry, can not get a number from the input</span>
    }
    return <span className="text-success">{((Number(num) % 2) === 0) ? '"El número es par."' : '"El número es impar."'}</span>
}
function toastReducer(state, {type}) {
    switch (type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'settleProperty': return {...state, response: getProperty()}
        default: alert('wrong call to toastReducer in 5.js', type)
    }
}
const toast = {show: false, response: ''}
let number = ''
const Fifth = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(e => {
        e.preventDefault()
        toastDispatch({type: 'settleProperty'})
        toastDispatch({type: 'show'})
    })
    return(
        <>
        <Form onSubmit={submitHandler} className="p-4 rounded bg-light">
            <Form.Group>
                <Form.Label htmlFor="fifth-number">Ingrese un número</Form.Label>
                <Form.Control id="fifth-number" type="number" onChange={e => number = e.currentTarget.value}/>
            </Form.Group>
            <Form.Control type="submit" as={Button} variant="primary">Enviar</Form.Control>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: 'hide'})}>
                <Toast.Header>
                    <img src={numbersSVG} width="30px" alt="numbers img" className="mr-2"/>
                    <strong className="mr-auto">Cualidad del n&uacute;mero</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{toastState.response}</p>
                    <div>Iconos diseñados por <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default Fifth