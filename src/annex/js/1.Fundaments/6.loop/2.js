import {memo, useReducer, useCallback, useRef} from 'react'
import {Modal, Toast, Form, Alert, Button} from 'react-bootstrap'

export const Statement = <p><b>2.</b>{' Crea una aplicación que solicite al usuario un valor numérico. Si el usuario introduce un valor no válido como letras o texto; deberá mostrarse un cuadro de diálogo con el mensaje "ERROR" y volvérsele a solicitar el valor hasta que lo indique correctamente. Para hacer este ejercicio debe emplearse la función '}<b>isNan()</b>{' de Javascript.'}</p>

const reducer = (state, {type, input}) => {
    switch (type) {
        case 'showModal': return {...state, showModal: true}
        case 'hideModal': 
            if (!state.validInput) return {...state, showModal: true, showToast: true, input: ''}
            return {...state, showModal: false, input: '', showToast: false}
        case 'hideToast': return {...state, showToast: false}
        case 'changeInput': return {...state, input, validInput: isNaN(input) ? false : true }
    }
}
const initialState = {
    showModal: false,
    showToast: false,
    input: '',
    validInput: false,
}

const Second = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const input = useRef(null)
    const submitHandler = useCallback(e => {
        e.preventDefault()
        dispatch({type: 'hideModal'})
    }, [])

    return(
        <>
        <div className="px-2 p-sm-4 rounded d-flex justify-content-center bg-light">
            <Button variant="primary" className="m-auto d-block" onClick={() => dispatch({type: 'showModal'})}>Ingresar un valor num&eacute;rico</Button>
        </div>
        <Modal show={state.showModal} backdrop="static" >
            <Modal.Header className="bg-dark text-light">
                <Modal.Title>Modal persistente</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">
                <p>Esta modal no se ir&aacute; hasta que ingrese un valor v&aacute;lido.</p>
                <Form onSubmit={submitHandler}>
                    <div className="d-flex justify-content-center">
                        <Toast show={state.showToast} onClose={() => dispatch({type: 'hideToast'})}>
                            <Toast.Header className="bg-light">
                                <strong className="mr-auto">Mensaje</strong>
                                <small>Like &#x2661;</small>
                            </Toast.Header>
                            <Toast.Body>
                                <Alert variant="danger">ERROR</Alert>
                            </Toast.Body>
                        </Toast>
                    </div>
                    <Form.Group controlId="second-value">
                        <Form.Label className="text-info">Valor num&eacute;rico</Form.Label>
                        <Form.Control type="text" onChange={e => dispatch({type: 'changeInput', input: e.currentTarget.value})}/>
                    </Form.Group>
                    <Form.Control type="submit" as={Button} variant="primary">Enviar</Form.Control>
                </Form>
            </Modal.Body>
        </Modal>
        </>
    )
})

export default Second