import {memo, useReducer, useCallback} from 'react'
import {Col, Modal, Form, Toast, Alert, Button} from 'react-bootstrap'

export const Statement = <p><b>3.</b>{' Crea una aplicación que solicite al usuario valores mostrando a contrinuación un cuadro de diálogo de confirmación mediante la función '}<b><e>confirm()</e></b>{' preguntándole si quiere continuar. Una vez que termina la página deberá mostrar al usuario la cantidad de valores introducidos y su media.'}</p>

const reducer = (state, {type, input}) => {
    switch (type) {
        case 'finish':  return {...state, media: state.values.reduce((prev, current) => prev += current) / state.values.length}
        case 'reset':  return initialState
        case 'addMore': return {...state, showModal: false}
        case 'showModal': 
            if (state.validValue) return {...state, showModal: true, input: 0, validValue: false, values: [...state.values, state.input]}
            return {...state, showToast: true}
        case 'changeInput':
            if (input === '' || input === null || typeof input === 'boolean' || isNaN(input)) return {...state, showToast: true, validValue: false, input: input}
            return {...state, showToast: false, validValue: true, input: Number(input)}
        case 'hideToast': return {...state, showToast: false}
    }
}
const initialState = {
    showModal: false,
    showToast: false,
    media: null,
    values: [],
    validValue: false,
    input: 0
}

const Third = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitHandler = useCallback( e => {
        e.preventDefault()
        dispatch({type: 'showModal'})
    }, [])
    const inputHandler = useCallback( e => {
        dispatch({type: 'changeInput', input: e.currentTarget.value})
    }, [])

    return(
        <>
        <Form className="p-2 p-sm-4 rounded bg-light" onSubmit={submitHandler}>
            <Form.Row className="align-items-end">
                <Toast show={state.showToast} onClose={() => dispatch({type: 'hideToast'})}>
                    <Toast.Header>
                        <strong className="mr-auto">Mensaje</strong>
                        <small>Like &#x2661;</small>
                    </Toast.Header>
                    <Toast.Body>
                        <Alert variant="danger">El valor no es v&aacute;lido</Alert>
                    </Toast.Body>
                </Toast>
                <Form.Group as={Col} controlId="third-value">
                    <Form.Label className="text-info">Ingrese un n&uacute;mero</Form.Label>
                    <Form.Control type="number" onChange={inputHandler} value={state.input}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control type="submit" as={Button} variant="primary">Enviar</Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
        <Modal show={state.showModal} backdrop="static">
            <Modal.Header></Modal.Header>
            <Modal.Body>
                {state.media ? 
                    <Alert variant="success" className="text-align-center">
                        <p>{`Ha ingresado ${state.values.length} valores`}</p>
                        <p>{`La media es: ${state.media}`}</p>
                    </Alert> 
                    : '¿Desea ingresar otro valor?'
                }
            </Modal.Body>
            <Modal.Footer>
                {state.media ?
                    <Button variant="primary" onClick={() => dispatch({type: 'reset'})}>Aceptar</Button>
                    : <>
                    <Button variant="secondary" onClick={() => dispatch({type: 'finish'})}>No</Button>
                    <Button variant="primary" onClick={() => dispatch({type: 'addMore'})}>Si</Button>
                    </>
                }
            </Modal.Footer>
        </Modal>
        </>
    )
})

export default Third