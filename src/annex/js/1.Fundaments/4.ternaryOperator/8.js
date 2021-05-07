import {memo, useReducer, useCallback} from 'react'
import {Form, Toast, Modal, Button} from 'react-bootstrap'
import webSVG from './web.svg'
export const Statement = <p><b>8.</b>{' Crea una página que solicite al usuario su nombre. Si el usuario introduce su nombre y pulsa el botón "Aceptar" deberá mostrarse un mensaje de bienvenida "Encantado de onocerte, XXXX". Si el usuario no introduce ningún nombre o cierra el cuadro de diálogo sin responder deberá mostrarse el mensaje "Usuario anónimo".'}</p>
const initialState = {
    isAnonymous: true,
    name: '',
    showToast: false,
    showModal: false,
    defaultGreeting: "Usuario anónimo",
    greeting: ''
}
function reducer(state, {type, name}) {
    switch (type) {
        case 'showModal': return {...state, showModal: true, showToast: false, name: '', isAnonymous: true}
        case 'hideModal': return {...state, showModal: false, name: '', isAnonymous: true}
        case 'changeName': return {...state, name, isAnonymous: false}
        case 'showToast': return {
            ...state,
            showToast: true,
            showModal: false,
            greeting: state.isAnonymous ? state.defaultGreeting : `Encantado de conocerte, ${state.name}`
        }
        case 'hideToast': return {
            ...state, showToast: false, greeting: '', isAnonymous: true, name: ''
        }
        default:
            alert('wrong call to dispatch in ternaryOperator/8.js')
    }
}

const Eighth = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitHandler = useCallback(e => {
        e.preventDefault()
        dispatch({type: 'showToast'})
    }, [])
    const inputHandler = useCallback(({currentTarget: {value}}) => {
        if (value.length > 0) dispatch({type: 'changeName', name: value})
    },[])
    return(
        <>
        <div className="p-4 rounded d-flex justify-content-center bg-light">
            <Button variant="primary" onClick={() => dispatch({type: 'showModal'})}>Entrar en la p&aacute;gina</Button>
        </div>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={state.showToast} onClose={() => dispatch({type: 'hideToast'})}>
                <Toast.Header>
                    <img src={webSVG} alt="image of a web page" width="30px" className="mr-2"/>
                    <strong className="mr-auto">P&aacute;gina</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p className="text-success">{state.greeting}</p>
                    <div>Icons made by <a href="" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Toast.Body>
            </Toast>
        </div>
        <Modal show={state.showModal} onHide={() => dispatch({type: 'hideModal'})}>
            <Modal.Header closeButton>
                <Modal.Title>¿Qui&eacute;n eres?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label htmlFor="eighth-name">¿C&oacute;mo debemos llamarle a usted?</Form.Label>
                        <Form.Control id="eighth-name" type="text" onChange={inputHandler}/>
                    </Form.Group>
                    <Form.Control type="submit" as={Button} variant="primary">Ingresar</Form.Control>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
})

export default Eighth