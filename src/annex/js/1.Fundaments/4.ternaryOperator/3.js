import {memo, useCallback, useReducer} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import credentialsSVG from './id-card.svg'
export const Statement = <p><b>3.</b>{' Si el nombre de usuario es incorrecto se mostrará el mensaje de error "Usuario no reconocido.". Si el nombre de usuario es correcto pero no la contraseña se mostraña el mensaje "Contraseña incorrecta".'}</p>

function getAffirmation({username, password} = credentials, {username: pUsername, password: pPassword} = userInput) {
    if (username === pUsername) {
        if (password === pPassword) return <span className="text-success">{'"¡Bienvenido!"'}</span>
        return <span className="text-danger">{'"Contraseña incorrecta"'}</span>
    }
    return <span className="text-danger">{'"Usuario no reconocido."'}</span>
}
function toastReducer(state, {type}) {
    switch (type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'settleAffirmation': return  {...state, affirmation: getAffirmation()}
    }
}

const toast = {
    show: false,
    affirmation: ''
}
const credentials = {
    username: 'Roger',
    password: 'CIPSA'
}
const userInput = {
    username: '',
    password: ''
}

const Third = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(() => {
        toastDispatch({type: 'settleAffirmation'})
        toastDispatch({type: 'show'})
    })

    return(
        <>
        <Form onSubmit={e => e.preventDefault()} className="p-4 rounded bg-light">
            <Form.Group>
                <Form.Label htmlFor="third-username">Ingrese su nombre de usuario</Form.Label>
                <Form.Control id="third-username" type="text" onChange={e => userInput.username = e.currentTarget.value} />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="third-password">Ingrese su contraseña</Form.Label>
                <Form.Control id="third-password" type="password" onChange={e => userInput.password = e.currentTarget.value} />
            </Form.Group>
            <Form.Group>
                <Form.Control type="submit" as={Button} variant="primary" onClick={submitHandler}>Enviar</Form.Control>
            </Form.Group>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: 'hide'})}>
                <Toast.Header>
                    <img src={credentialsSVG} alt="id card img" className="mr-2" width="30px"/>
                    <strong className="mr-auto">Page</strong>
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

export default Third