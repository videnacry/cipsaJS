import {memo, useReducer, useCallback} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import checkSVG from './check-in.svg'

export const Statement = <p>{'2. Crea una página que solicite al usuario un nombre y contraseña. Si el nombre es "Roger" y la contraseña es "CIPSA" se mostrarña un mensaje de bienvenida.'}</p>

const credentials = {
    username: 'Roger',
    password: 'CIPSA'
}
const userInput = {
    username: '',
    password: ''
}
const toast = {
    show: false,
    affirmation: ''
}
const getAffirmation = ({username, password} = credentials, {username: pUsername, password: pPassword} = userInput) => {
    if (username === pUsername) {
        if (password === pPassword) return <span className="text-success">¡Bienvenido Roger.!</span>
        return <span className="text-danger">Contraseña incorrecta</span>
    }
    console.log(username, pUsername)
    return <span className="text-danger">Usuario incorrecto</span>
}
const toastReducer = (state, action) => {
    switch (action.type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'setAffirmation': return {...state, affirmation: getAffirmation()}
    }
}

const Second = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(() => {
        toastDispatch({type: 'setAffirmation'})
        toastDispatch({type: 'show'})
    }, [])
    return(
        <>
        <Form onSubmit={e => e.preventDefault()} className="bg-light p-4 rounded">
            <Form.Group>
                <Form.Label htmlFor="user-username">Ingresa tu nombre de usuario</Form.Label>
                <Form.Control id="user-username" type="text" onChange={e => userInput.username = e.currentTarget.value}/>
            </Form.Group>
            <Form.Group>
                <Form.Label html="user-password">Ingresa tu contrase&ntilde;a</Form.Label>
                <Form.Control id="user-password" type="password" min="1" onChange={e => userInput.password = e.currentTarget.value}/>
            </Form.Group>
            <Form.Control type="submit" as={Button} variant="primary" onClick={submitHandler}>Enviar</Form.Control>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: "hide"})}>
                <Toast.Header>
                    <img src={checkSVG} alt="check-in img" width="30px" className="mr-2"/>
                    <strong className="mr-auto">Resultado</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{toastState.affirmation}</p>
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default Second