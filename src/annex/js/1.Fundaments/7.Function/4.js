import {memo, useEffect, useReducer, useRef, useCallback} from 'react'
import {Col, Modal, Form, Alert, Toast, Button} from 'react-bootstrap'
export const Statement = <p><b>4.</b>{' Crea una función mostrarTabla() que recibe como parámetro un valor y muestra en la tabla la tabla de multiplicar del valor correspondiente empleando '}<e>document.write().</e></p>

const isNum = (num) => (num === '' || num === null || typeof num === 'boolean' || isNaN(num)) ? false : true
const changeMultiplier = (state, multiplier) => {
    const showAlert = !isNum(multiplier)
    const validMultiplier = !showAlert
    const submitDisabled = showAlert
    return {...state, multiplier, showAlert, validMultiplier, submitDisabled}
}
const reducer = (state, {type, multiplier}) => {
    switch (type) {
        case 'hideTable': return {...state, showTable: false}
        case 'showTable': return {...state, showTable: true}
        case 'changeMultiplier': return changeMultiplier(state, multiplier)
        case 'closeAlert': return {...state, showAlert: false}
    }
}
const initialState = {
    showTable: false,
    showAlert: false,
    validMultiplier: false,
    multiplier: '',
    submitDisabled: true
}

const Fourth = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // const tableIframe = useRef(null)
    const submitHandler = useCallback((e, pState, pDispatch = dispatch) => {
        e.preventDefault()
        if (!pState.submitDisabled) pDispatch({type: 'showTable'})
    }, [])
    const changeHandler = useCallback((e, pDispatch = dispatch) => {
        pDispatch({type: 'changeMultiplier', multiplier: e.currentTarget.value})
    }, [])

    // useEffect(() => {
    //     const iframe = window.open('', 'fourth-table')
    //     tableIframe.current = iframe
    // }, [])
    useEffect(() => {
        if (state.showTable) {
            const multiplicands = [1,2,3,4,5,6,7,8,9,10]
            const iframe = window.open('', 'fourth-table')
            iframe.document.write(`
            <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
            </head>
            <body class="bg-dark">
                <table class="table table-dark table-hover text-align-center">
                    <thead>
                        <tr>
                            <th scope="col">Multiplier</th>
                            <th></th>
                            <th scope="col">Multiplicand</th>
                            <th></th>
                            <th scope="col">Product</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        ${multiplicands.map(multiplicand => 
                            `<tr>
                                <td>
                                    ${state.multiplier}
                                </td>
                                <td>x</td>
                                <td>
                                    ${multiplicand}
                                </td>
                                <td>=</td>
                                <td>
                                    ${state.multiplier * multiplicand}
                                </td>
                            </tr>`
                        )}
                    </tbody>
                </table>
            </body>
            `)
        }
    
    }, [state.showTable])

    return(
        <>
        <Form onSubmit={e => submitHandler(e, state)} className="rounded p-2 p-sm-4 bg-light">
            <Form.Row className="align-items-end">
                <Form.Group as={Col} controlId="fourth-multiplier">
                    <Toast show={state.showAlert} onClose={() => dispatch({type: 'closeAlert'})}>
                        <Toast.Header>
                            <strong className="mr-auto">Mensaje</strong>
                            <small>Like &#x2661;</small>
                        </Toast.Header>
                        <Toast.Body>
                            <Alert variant="danger">Ingrese otro valor n&uacute;merico</Alert>
                        </Toast.Body>
                    </Toast>
                    <Form.Label className="text-info">Ingrese un n&uacute;mero</Form.Label>
                    <Form.Control type="number" onChange={changeHandler}/>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Control type="submit" as={Button} variant="primary" disabled={state.submitDisabled}>Enviar</Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
        <Modal show={state.showTable} onHide={() => dispatch({type: 'hideTable'})}>
            <Modal.Header closeButton className="bg-light">
                <Modal.Title>Tabla del {state.multiplier}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <iframe name="fourth-table" width="80%" className="m-auto rounded" style={{height: '60vh'}}/>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
        </>
    )
})

export default Fourth