import {memo, useReducer, useCallback} from 'react'
import {Col, Form, Toast, Alert, Button, ProgressBar} from 'react-bootstrap'
export const Statement = <p><b>2.</b>{' Crea una función '}<e>enumerador()</e>{' que reciba como parámetros dos valores y muestre en pantalla los valores comprendidos entre ambos de menor a mayor.'}</p>

const isNum = (num) => {
    if (num === '' || typeof num === 'boolean' || num === null || isNaN(num)) return false
    return true
}
const getStateAfterValidateNum1 = (state, num1) => {
    const showAlert1 = isNum(num1) ? false : true
    const submitDisabled = (showAlert1 || !state.num2Valid) ? true : false
    return {...state, num1, showAlert1, num1Valid: !showAlert1, submitDisabled}
}
const getStateAfterValidateNum2 = (state, num2) => {
    const showAlert2 = isNum(num2) ? false : true
    const submitDisabled = (showAlert2 || !state.num1Valid) ? true : false
    return {...state, num2, showAlert2, num2Valid: !showAlert2, submitDisabled}
}
const reducer = (state, {type, num1, num2, bar}) => {
    switch (type) {
        case 'reset': return {...initialState}
        case 'addBar': return {...state, bars: [...state.bars, bar], submitDisabled: true, inputsDisabled: true}
        case 'badDifference': return {...state, showAlert3: true}
        case 'changeNum1': return getStateAfterValidateNum1(state, num1)
        case 'changeNum2': return getStateAfterValidateNum2(state, num2)
        case 'closeAlert1': return {...state, showAlert1: false}
        case 'closeAlert2': return {...state, showAlert2: false}
        case 'closeAlert3': return {...state, showAlert3: false}
        default: 
            alert('Bad dispatch in js/fundaments/functions/2')
            return {...state}
    }
}
const initialState = {
    bars: [],
    submitDisabled: true,
    inputsDisabled: false,
    showAlert1: false,
    showAlert2: false,
    showAlert3: false,
    num1Valid: false,
    num2Valid: false,
    num1: '',
    num2: '',
    nums: null
}
const barVariants = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark']
const getBar = (max, num) => {
    const variant = barVariants[(Math.random() * 7).toFixed(0)]
    return <ProgressBar now={1} variant={variant} max={max} label={num}/>
}
const fillProgressBar = async ({num1, num2}, dispatch) => {
    disabledInputs = true
    let min = Number(num1), max = Number(num2)
    if (num1 > num2) {
        min = Number(num2)
        max = Number(num1)
    }
    min++
    const difference = max - min
    if (difference === 0 || num1 == num2) {
        dispatch({type: 'badDifference'})
    } else {
        dispatch({type: 'addBar', bar: getBar((difference), min)})
        min++
        for (let num = min; num < max; num++) {
            const res = await new Promise(resolve => setTimeout(() => resolve('done'), 100))
            dispatch({type: 'addBar', bar: getBar((difference), num)})
        }
    }
    disabledInputs = false
}
let disabledInputs = false
const Second = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const submitHandler = useCallback((e, pState, pDispatch = dispatch) => {
        e.preventDefault()
        if (!pState.submitDisabled && !disabledInputs) fillProgressBar(pState, pDispatch)
    }, [])
    const changeHandler = useCallback((e, numIdx = '1') => dispatch({type: `changeNum${numIdx}`, [`num${numIdx}`]: e.currentTarget.value}), [])
    return(
        <Form onSubmit={e => submitHandler(e, state)} className="rounded p-2 bg-light">
            <Toast show={state.showAlert3} onClose={() => dispatch({type: 'closeAlert3'})} className="m-auto">
                <Toast.Header>
                    <strong className="mr-auto">Alert</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body><Alert variant="danger">La diferencia entre los dos n&uacute;meros no es suficiente</Alert></Toast.Body>
            </Toast>
            <Form.Row className="align-items-end">
                <Form.Group as={Col} controlId='second-num1' className="border-right border-secondary p-2 p-sm-4">
                    <Toast show={state.showAlert1} onClose={() => dispatch({type: 'closeAlert1'})}>
                        <Toast.Header>
                            <strong className="mr-auto">Alert</strong>
                            <small>Like &#x2661;</small>
                        </Toast.Header>
                        <Toast.Body><Alert variant="danger">Por favor ingresa otro valor num&eacute;rico</Alert></Toast.Body>
                    </Toast>
                    <Form.Label className="text-info">Primer n&uacute;mero</Form.Label>
                    <Form.Control type="number" value={state.num1} disabled={state.inputsDisabled}
                        onChange={e => changeHandler(e)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId='second-num2' className="p-2 p-sm-4">
                    <Toast show={state.showAlert2} onClose={() => dispatch({type: 'closeAlert2'})}>
                        <Toast.Header>
                            <strong className='mr-auto'>Alert</strong>
                            <small>Like &#x2661;</small>
                        </Toast.Header>
                        <Toast.Body><Alert variant="danger">Por favor ingresa otro valor num&eacute;rico</Alert></Toast.Body>
                    </Toast>
                    <Form.Label className="text-info">Segundo n&uacute;mero</Form.Label>
                    <Form.Control type="number" value={state.num2} disabled={state.inputsDisabled}
                        onChange={e => changeHandler(e, 2)}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Control type="submit" as={Button} variant="primary" disabled={state.submitDisabled}>Enviar</Form.Control>
            <Form.Group>
                <br/>
                <ProgressBar>
                    {state.bars}
                </ProgressBar>
            </Form.Group>
            <Button variant="secondary" onClick={() => dispatch({type: 'reset'})} block
                disabled={(state.submitDisabled && state.inputsDisabled) ? false : true}
            >Reiniciar</Button>
        </Form>
    )
})

export default Second