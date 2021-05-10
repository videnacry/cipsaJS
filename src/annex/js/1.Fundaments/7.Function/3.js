import {memo, useReducer, useCallback} from 'react'
import {Col, Form, Toast, Alert, Button} from 'react-bootstrap'

export const Statement = <ol className="list-unstyled">
    <p><b>3.</b>{' Crea una función calcular() que recibe como parámetros tres valores: a, b y op, y devuelve un valor en base al valor del parámetro op:'}</p>
    <li className="pl-2 pl-sm-4">{'a. Si op = 1 -> Retorna la suma (a + b)'}</li>
    <li className="pl-2 pl-sm-4">{'b. Si op= 2 -> Rotorna la resta (a - b)'}</li>
    <li className="pl-2 pl-sm-4">{'c. Si op = 3 -> Retorna el producto (a x b'}</li>
    <li className="pl-2 pl-sm-4">{'d. Si op = 4 -> Retorna el cociente (a / b)'}</li>
    <li className="pl-2 pl-sm-4">{'e. Si op no vale ninguno de los valores anteriores la función devuelve como resultado el mensaje "Operación no reconocida".'}</li>
</ol>
const isNum = (num) => (num === '' || num === null || typeof num === 'boolean' || isNaN(num)) ? false : true
const isValid = ({valid}) => {
    let isValid = false
    for (let key in valid) {
        if (valid[key] === false) {
            isValid = true
            break
        }
    }
    return isValid
}
const changeTerm = (state, term, idx) => {
    const validTerm = isNum(term)
    const showAlert = {...state.showAlert, [idx]: !validTerm}
    const valid = {...state.valid, [idx]: validTerm}
    const submitDisabled = isValid({valid})
    return {...state, [idx]: term, showAlert, valid, submitDisabled, showResult: false}
}
const changeOp = (state, op) => {
    const operations = {
        1: (a, b) => Number(a) + Number(b),
        2: (a, b) => a - b,
        3: (a, b) => a * b,
        4: (a, b) => a / b,
    }
    const operation = operations[op]
    const showAlert = {...state.showAlert, op: false}
    if (typeof operation !== 'function') showAlert.op = true
    const valid = {...state.valid, op: !showAlert.op}
    const submitDisabled = isValid({valid})
    return {...state, showAlert, valid, op, operation, submitDisabled, showResult: false}
}
const reducer = (state, {type, op, idx, term}) => {
    switch (type) {
        case 'getResult': return {...state, result: state.operation(state.a, state.b), showResult: true}
        case 'closeResult': return {...state, showResult: false}
        case 'changeOp': return changeOp(state, op)
        case 'changeTerm': return changeTerm(state, term, idx)
        case 'closeAlert': return {...state, showAlert: {...state.showAlert, [idx]:false}}
        default: 
            alert('bad dispatch js/fundaments/function/3')
            return {...state}
    }
}
const initialState = {
    showResult: false,
    result: '',
    operation: null,
    showAlert: {
        a: false,
        b: false,
        op: false
    },
    valid: {
        a: false,
        b: false,
        op: false
    },
    a: '',
    b: '',
    op: '',
    submitDisabled: true,
}
const terms = ['a', 'b']
const Third = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitHandler = useCallback((e, state, pDispatch = dispatch) => {
        e.preventDefault()
        if (!state.submitDisabled) pDispatch({type: 'getResult'})
    }, [])
    const changeHandler = useCallback((e, idx, pDispatch = dispatch) => {
        pDispatch({type: 'changeTerm', idx, term: e.currentTarget.value})
    }, [])

    return(
        <>
        <Form onSubmit={e => submitHandler(e, state)} className="rounded p-2 p-sm-4 bg-light">
            <Form.Row className="align-items-end">
                {terms.map((term, idx) => (
                    <Form.Group key={`third-num-group-${idx}`} as={Col} controlId={`third-num-${term}`} className={idx === 0 ?'border-right' : ''}>
                        <Toast show={state.showAlert[term]} onClose={() => dispatch({type: 'closeAlert', idx: term})} className="m-auto">
                            <Toast.Header>
                                <strong className="mr-auto">Mensaje</strong>
                                <small>Like &#x2661;</small>
                            </Toast.Header>
                            <Toast.Body>
                                <Alert variant="danger">El valor no es v&aacute;lido</Alert>
                            </Toast.Body>
                        </Toast>
                        <Form.Label className="text-info">N&uacute;mero {term}</Form.Label>
                        <Form.Control type="number" value={state[term]} onChange={e => changeHandler(e, term)} />
                    </Form.Group>
                ))}
            </Form.Row>
            <Form.Row className="align-items-end">
                <Form.Group as={Col} controlId="third-op" className='border-right'>
                    <Toast show={state.showAlert.op} onClose={() => dispatch({type: 'closeAlert', idx: 'op'})} className="m-auto">
                        <Toast.Header>
                            <strong className="mr-auto">Mensaje</strong>
                            <small>Like &#x2661;</small>
                        </Toast.Header>
                        <Toast.Body>
                            <Alert variant="danger">Operaci&oacute;n no reconocida</Alert>
                        </Toast.Body>
                    </Toast>
                    <Form.Label className="text-info">N&uacute;mero de la operaci&oacute;n</Form.Label>
                    <Form.Control type="number" value={state.op} onChange={e => dispatch({type: 'changeOp', op: e.currentTarget.value})} />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control type="submit" as={Button} variant="primary" disabled={state.submitDisabled}>
                        Realizar operaci&oacute;n
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
        <br/>
        <Toast show={state.showResult} onClose={() => dispatch({type: 'closeResult'})} className="m-auto">
            <Toast.Header>
                <strong className="mr-auto">Resultado</strong>
                <small>Like &#x2661;</small>
            </Toast.Header>
            <Toast.Body>
                <Alert variant="success">{state.result}</Alert>
            </Toast.Body>
        </Toast>
        </>
    )
})

export default Third