import {memo, useReducer, useCallback} from 'react'
import {Col, Form, Toast, Alert, Button} from 'react-bootstrap'

export const Statement = <p><b>1.</b>{' Crea una función '}<e>esPar()</e>{' que recibe un valor como parámetro y retorna un valor lógico indicando si es o no par.'}</p>

const getResultMessage = ({num}) => <Alert variant="success text-align-center">
        {`Es par = ${num % 2 === 0 ? 'true' : 'false'}`}
    </Alert>
const getStateAfterValidateNum = (state, num) => {
    console.log(num)
    if (num === '' || num === null || typeof num === 'boolean' || isNaN(num)) {
        return {...state, num, showAlert: true, disabledSubmit: true, showResult: false}
    }
    return {...state, num, showAlert: false, disabledSubmit: false, showResult: false}
}
const reducer = (state, {type, num}) => {
    switch (type) {
        case 'hideAlert': return {...state, showAlert: false}
        case 'hideResult': return {...state, showResult: false}
        case 'changeNum': return getStateAfterValidateNum(state, num)
        case 'showResult': return {...state, showResult: true, resultMessage: getResultMessage(state)}
        default: return alert('Bad dispatch js/fundaments/function/1')
    }
}
const initialState = {
    showAlert: false,
    showResult: false,
    resultMessage: '',
    num: '',
    disabledSubmit: true
}

const First = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitHandler = useCallback((e, pDispatch = dispatch) => {
        e.preventDefault()
        if (state.disabledSubmit) {
            pDispatch({type: 'showResult'})
        }
    }, [])

    return(
        <>
        <Form onSubmit={e => submitHandler(e)} className="rounded p-2 p-sm-4 bg-light">
            <Toast show={state.showAlert} onClose={() => dispatch({type: 'hideAlert'})} className="m-auto">
                <Toast.Header>
                    <strong className="mr-auto">Alerta</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <Alert variant="danger">Por favor, pruebe con otro n&uacute;mero.</Alert>
                </Toast.Body>
            </Toast>
            <Form.Group controlId="first-num" as={Col}>
                <Form.Label className="text-info">Ingrese un n&uacute;mero</Form.Label>
                <Form.Control type="number" onChange={e => dispatch({type: 'changeNum', num: e.currentTarget.value})} value={state.num}/>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Control type="submit" as={Button} variant="primary" disabled={state.disabledSubmit}>Enviar</Form.Control>
            </Form.Group>
        </Form>
        <br/>
        <Toast show={state.showResult} onClose={() => dispatch({type: 'hideResult'})} className="m-auto">
            <Toast.Header>
                <strong className="mr-auto">Resultado</strong>
                <small>Like &#x2661;</small>
            </Toast.Header>
            <Toast.Body>
                {state.resultMessage}
            </Toast.Body>
        </Toast>
        </>
    )
})

export default First