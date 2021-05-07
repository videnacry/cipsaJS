import {memo, useCallback, useState, useReducer} from 'react'
import {Form, Button, Toast} from 'react-bootstrap'
import maskSVG from './mascara.svg'

export const Statement = <div><b>1.</b>{' Crea una página que solicite al usuario su nombre. En caso de que el nombre indicado sea "Roger" se mostrará un mensaje dándole la bienvenida. En caso contrario se mostrará el mensaje "Página no disponible".'}</div>

const toast = {show: false}
const toastReducer = (state, action) => {
    switch (action.type) {
        case 'show': return {show: true}
        case 'hide': return {show: false}
        default: alert('toastReducer bad dispatch')
    }
}

const username = 'Roger'
let userInput = ''
const First = memo(() => {
    const [affirmation, setAffirmation] = useState('"Página no disponible."')
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(() => {
        setAffirmation(() => username === userInput ? (
            <span className="text-success">{'¡Bienvenido Roger.!'}</span>
            ) : (
            <span className="text-danger">{'Página no disponible.'}</span>
        ))
        toastDispatch({type: 'show'})
    }, [])
    return(
        <>
        <Form onSubmit={e => e.preventDefault()} className="bg-light rounded p-4">
            <Form.Group>
                <Form.Label htmlFor="username">Ingrese su nombre</Form.Label>
                <Form.Control type="text" onChange={e => userInput = e.currentTarget.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Control type="submit" as={Button} onClick={submitHandler}>Enviar</Form.Control>
            </Form.Group>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: 'hide'})}>
                <Toast.Header>
                    <img src={maskSVG} width="30px" alt="welcome img" className="mr-2"/>
                    <strong className="mr-auto">Respuesta</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{affirmation}</p>
                    <div>Iconos diseñados por <a href="https://creativemarket.com/Becris" title="Becris">Becris</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default First