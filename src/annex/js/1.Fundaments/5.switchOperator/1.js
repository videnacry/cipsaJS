import {memo, useReducer, useCallback} from 'react'
import {Col, Form, Toast, Button} from 'react-bootstrap'
import operatorsSVG from './1.svg'
export const Statement = <div>
    <p><b>1.</b>{' Crea una página que solicite al usuario dos valores numéricos y una operación "suma", "resta", "producto" o "división". La página mostrrá a continuación el resultado correspondiente en función de la operación solicitada.'}</p>
    <p>{'Si el usuario introduce una palabra diferente a las indicadas deberá mostrarse el mensaje "Operación no válida".'}</p>
</div>

function reducer(state, {type, number, operator}) {
    switch (type) {
        case 'setFirstNumber': return {...state, firstNumber: number === '' ? 0 : Number(number)}
        case 'setSecondNumber': return {...state, secondNumber: number === '' ? 0 : Number(number)}
        case 'setOperator': return {
            ...state,
            validOperator: Object.keys(state.operators).includes(operator) ? true : false,
            operator: state.operators[operator]
        }
        case 'showToast': return {
            ...state,
            result: state.validOperator ? state.successResult(state) : state.failResult,
            showToast: true
        }
        case 'hideToast': return {...initialState}
        default: alert('Bad dispatch in switchOperator/1')
    }
}
const initialState = {
    showToast: false,
    validOperator: false,
    operators: {
        suma: (num1, num2) => num1 + num2,
        resta: (num1, num2) => num1 - num2,
        producto: (num1, num2) => num1 * num2,
        división: (num1, num2) => num1 / num2
    },
    operator: '',
    firstNumber: 0,
    secondNumber: 0,
    result: '',
    failResult: <span className="text-danger">Operaci&oacute;n no v&aacute;lida.</span>,
    successResult: ({firstNumber, secondNumber, operator}) => {
        return <span className="d-block h3 text-center text-success">{operator(firstNumber, secondNumber)}</span>
    }
}

const First = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitHandler = useCallback(e => {
        e.preventDefault()
        dispatch({type: 'showToast'})
    }, [])
    const operatorHandler = useCallback(e => {
        const operator = e.currentTarget.value.toLowerCase()
        dispatch({type: 'setOperator', operator})
    }, [])
    return(
        <>
        <Form className="p-4 rounded bg-light" onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label htmlFor="first-operator">
                    Ingrese un operador v&aacute;lido =&gt; [suma, resta, producto, división]
                </Form.Label>
                <Form.Control id="first-operator" type="text" placeholder="división" onChange={operatorHandler}/>
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="first-first-num">
                    <Form.Label>Ingrese el primer n&uacute;mero</Form.Label>
                    <Form.Control type="number" value={state.firstNumber} onChange={e => dispatch({type: 'setFirstNumber', number: e.currentTarget.value})}/>
                </Form.Group>
                <Form.Group as={Col} controlId="first-second-num">
                    <Form.Label>Ingrese el segundo n&uacute;mero</Form.Label>
                    <Form.Control type="number" value={state.secondNumber}  onChange={e => dispatch({type: 'setSecondNumber', number: e.currentTarget.value})}/>
                </Form.Group>
            </Form.Row>
            <Form.Control type="submit" as={Button} variant="primary">Realizar operaci&oacute;n</Form.Control>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={state.showToast} onClose={() => dispatch({type: 'hideToast'})}>
                <Toast.Header>
                    <img src={operatorsSVG} alt="" width="30px" className="mr-2"/>
                    <strong className="mr-auto">Resultado de la operaci&oacute;n</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{state.result}</p>
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default First