import {memo, useReducer, useCallback, useRef} from 'react'
import {Col, Modal, Toast, Alert, Button, Form} from 'react-bootstrap'

export const Statement = <p><b>4.</b> {'Crea una aplicación que solicite al usuario un valor entre 1 y 10. La página solicitará después uno a uno los valores de la tabla de multiplicar del valor indicado inicialmente. Si el usuario acierta cada valor se le mostrará un cuadro de diálogo con el mensaje "CORRECTO". En caso contrario se le mostrará un cuadro de diálogo indicando el valor correcto. Una vez preguntados todos los valores la página deberá mostrar el porcentaje de aciertos del usuario.'}</p>

const nextHandler = (e, state, dispatch) => {
    e.preventDefault()
    dispatch({type: 'nextProduct'})
}
const  sendHandler = (e, state, dispatch, product) => {
    e.preventDefault()
    dispatch({type: 'setProduct', product})
}
const finishHandler = (e, state, dispatch) => {
    e.preventDefault()
    dispatch({type: 'finish'})
}
const reducer = (state, {type, product, multiplier}) => {
    let buttonContent = 'Enviar'
    let modalHandler = nextHandler
    const showToast = true
    const multiplicand = Number(state.multiplicand)
    switch (type) {
        case 'finish': return {...initialState, showToast, toastMessage: hitsPercentage(state)}
        case 'cancel': return {...initialState}
        case 'nextProduct': return {...state, showToast: false, buttonContent, product: '', modalHandler: sendHandler, multiplicand: multiplicand + 1}
        case 'setProduct':
            if (product === '' || product === null || typeof Number(product) !== 'number') return {...state, showToast, toastMessage: invalidValue}
            let trueProduct = Number(state.multiplier) * state.multiplicand
            buttonContent = 'Siguiente'
            if (multiplicand == 10)
                modalHandler = finishHandler
            if (trueProduct == product)
                return {...state, showToast, toastMessage: validProduct, buttonContent, hits: state.hits + 1, modalHandler}
            return {...state, showToast, toastMessage: invalidProduct(state, trueProduct), buttonContent, fails: state.fails + 1, modalHandler}
        case 'setMultiplier':
            if (multiplier === '' || multiplier === null || typeof Number(multiplier) !== 'number')
                return {...state, showToast, toastMessage: invalidValue, multiplier, buttonContent}
            return {...state, showToast: false, multiplier, buttonContent, showModal: true}
        case 'hideToast': return {...state, showToast: false}
    }
}
const hitsPercentage = ({hits, fails}) => {
    const total = (hits / (hits + fails)) * 100
    return <Alert variant="info">{`El porcentaje total de aciertos es: ${total}`}</Alert>
}
const validProduct = <Alert variant="success">'"CORRECTO."'</Alert>
const invalidProduct = ({multiplier, multiplicand}, product) => <Alert variant="info">
    {(() => {
        const terms = []
        for (let count = multiplicand; count > 0; count--) {
            terms.push(`+${multiplier}`)
        }
        return <p>{`${terms.join(' ')} = ${product}`}</p>
    })()}
    <p>{`${multiplier} * ${multiplicand} = ${product}`}</p>
</Alert>
const invalidValue = <Alert variant="danger">Ingrese un valor entre 1 y 10</Alert>
const initialState = {
    showToast: false,
    toastMessage: '',
    showModal: false,
    modalHandler: sendHandler,
    multiplier: '',
    multiplicand: 1,
    product: '',
    hits: 0,
    fails: 0
}

const Fourth = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const multiplier = useRef(null)
    const product = useRef(null)
    const changeMultiplier = useCallback(e => {
        e.preventDefault()
        dispatch({type: 'setMultiplier', multiplier: multiplier.current.value})
    }, [])

    return(
        <>
        <Form onSubmit={changeMultiplier} className="rounded p-2 p-sm-4 bg-light">
            <Form.Row className="align-items-end">
                <Toast show={state.showToast} onClose={() => dispatch({type: 'hideToast'})}>
                    <Toast.Header>
                        <strong className="mr-auto">Mensaje</strong>
                        <small>Like &#x2661;</small>
                    </Toast.Header>
                    <Toast.Body>
                        {state.toastMessage}
                    </Toast.Body>
                </Toast>
                <Form.Group as={Col} controlId={'fourth-multiplier'}>
                    <Form.Label className="text-info">Ingrese un n&uacute;mero para realizar su tabla de multiplicar</Form.Label>
                    <Form.Control type="number" min="1" max="10" ref={multiplier}/>
                </Form.Group>
                <Form.Group as={Col}><Form.Control type="submit" as={Button} variant="primary">Enviar</Form.Control></Form.Group>
            </Form.Row>
        </Form>
        <Modal show={state.showModal} backdrop='static'>
            <Modal.Header><Modal.Title>Tabla de multiplicar</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form onSubmit={e => state.modalHandler(e, state, dispatch, product.current.value)} show={state.showModal}>
                    <Toast className="m-auto" show={state.showToast} onClose={() => dispatch({type: 'hideToast'})}>
                        <Toast.Header>
                            <strong className="mr-auto">Mensaje</strong>
                            <small>Like &#x2661;</small>
                        </Toast.Header>
                        <Toast.Body>
                            {state.toastMessage}
                        </Toast.Body>
                    </Toast>
                    <Form.Group controlId="fourth-product">
                        <Form.Label className="text-info">{`Ingrese el producto de ${state.multiplier} por ${state.multiplicand}`}</Form.Label>
                        <Form.Control type="number" ref={product}/>
                    </Form.Group>
                    <Form.Row className="justify-content-end">
                        <Button variant="danger" onClick={() => dispatch({type: 'cancel'})}>Cancel</Button>
                        <Form.Control className="w-auto" type="submit" as={Button} variant="primary">{state.buttonContent}</Form.Control>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
        </>
    )
})

export default Fourth