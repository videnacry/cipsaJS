import {memo, useCallback, useReducer} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import scoreSVG from './exam.svg'
export const Statement = 
    <dd>
        <dl>
            <p><b>6.</b>{' Crea una página que solicite al usuario el número de preguntas existentes en un examen de tipo Test, y cuántas ha acertado. En función de los valores indicados la página deberá calcular la nota obtenida y mostrar la calificación que corresponda en función de los siguientes baremos:'}</p>
            <li className="list-group pl-4">{'√ Si la nota está entre 0 y 2 -> Muy deficiente'}</li>
            <li className="list-group pl-4">{'√ Si la nota está entre 2 y 5 -> Insuficiente'}</li>
            <li className="list-group pl-4">{'√ Si la nota está entre 5 y 6 -> Suficiente'}</li>
            <li className="list-group pl-4">{'√ Si la nota está entre 6 y 7 -> Bien'}</li>
            <li className="list-group pl-4">{'√ Si la nota está entre 7 y 9 -> Notable'}</li>
            <li className="list-group pl-4">{'√ Si la nota está entre 9 y 10 -> Sobresaliente'}</li>
        </dl>
    </dd>

function getScore(questionCount = input.count, hits = input.hits) {
    if (questionCount === '' || hits === '') return <span className="text-danger">El valor encontrado en los inputs no es v&aacute;lido.</span>
    const score = (Number(hits) * 10) / Number(questionCount)
    const getSpan = txt => <span className="text-success">{txt}</span>
    if (score > 9) return getSpan('Sobresaliente')
    if (score > 7) return getSpan('Notable')
    if (score > 6) return getSpan('Bien')
    if (score > 5) return getSpan('Suficiente')
    if (score > 2) return getSpan('Insuficiente')
    return getSpan('Muy deficiente')
}
function toastReducer(state, {type}) {
    switch (type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'settleScore': return {...state, response: getScore()}
    }
}
const toast = {show: false, response: ''}
const input = {count: '', hits: ''}

const Sixth = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(e => {
        e.preventDefault()
        toastDispatch({type: 'settleScore'})
        toastDispatch({type: 'show'})
    }, [])
    return(
        <>
        <Form onSubmit={submitHandler} className="p-4 rounded bg-light">
            <Form.Group>
                <Form.Label htmlFor="sixth-questions">N&uacute;mero de preguntas</Form.Label>
                <Form.Control id="sixth-questions" type="number" min="1" onChange={({currentTarget: {value}}) => input.count = (value >= 1) ? value : ''}/>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="sixth-hits">N&uacute;mero de aciertos</Form.Label>
                <Form.Control id="sixth-hits" type="number" min="0" onChange={({currentTarget: {value}}) => input.hits = (value >= 0) ? value : ''}/>
            </Form.Group>
            <Form.Control type="submit" as={Button} variant="primary">Enviar</Form.Control>
        </Form>
        <br/>
        <div className='d-flex justify-content-center'>
            <Toast show={toastState.show} onClose={() => toastDispatch({type: 'hide'})}>
                <Toast.Header>
                    <img src={scoreSVG} alt="test with checks img" className="mr-2" width="30px"/>
                    <strong className="mr-auto">Score</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{toastState.response}</p>
                    <div>Icons made by <a href="" title="Linector">Linector</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default Sixth