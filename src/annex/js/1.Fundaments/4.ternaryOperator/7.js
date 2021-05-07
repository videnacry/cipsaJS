import {memo, useEffect, useCallback, useReducer, useState, useRef} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import ageSVG from './couple.svg'

export const Statement = <p><b>7.</b>{' Crea una página que solicite alternativamente el nombre y edad de tres personas y muestre a continuación el nombre de la mayor y la menor de ellas.'}</p>

function getResolution(members = persons) {
    members.sort(({age}, {age: pAge}) => age < pAge ? -1 : age === pAge ? 0 : 1)
    const olderName = members[members.length - 1].name
    const youngerName = members[0].name
    return(
        <span className="text-success">{`${olderName} es el mayor de los tres y ${youngerName} el menor de ellos.`}</span>
    )
}
function toastReducer(state, {type}) {
    switch (type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'settleComparison': return {...state, response: getResolution()}
        default: alert('wrong call to toastReducer in 7.js')
    }
}
const formSteps = ['primera', 'segunda', 'tercera']
const persons = [{name: '', age: ''}, {name: '', age: ''}, {name: '', age: ''}]
const toast = {show: false, response: ''}

const Seventh = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const [formStep, setFormStep] = useState(0)
    const inputs = useRef([])
    const submitHandler = useCallback(e => {
        e.preventDefault()
        if (!persons[formStep].name.length > 0) return alert('empty name')
        if (formStep === 2) {
            toastDispatch({type: 'settleComparison'})
            toastDispatch({type: 'show'})
            setFormStep(() => 0)
        } else {
            setFormStep(prevState => prevState + 1)
        }
        inputs.current.forEach(input => input.value = '')
    }, [formStep])
    useEffect(() => persons.forEach(person => {
        person.name = ''
        person.age = ''
    }), [toastState.response])
    const step = formSteps[formStep]
    const person = persons[formStep]
    return(
        <>
        <Form onSubmit={submitHandler} className="p-4 rounded bg-light">
            <Form.Group>
                <Form.Label htmlFor={`seventh-${step}-name`}>Nombre de la {step} integrante</Form.Label>
                <Form.Control htmlFor={`seventh-${step}-name`} type="text"
                ref={ref => inputs.current[0] = ref}
                onChange={e => person.name = e.currentTarget.value}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor={`seventh-${step}-age`}>Edad de la {step} integrante</Form.Label>
                <Form.Control htmlFor={`seventh-${step}-age`} type='number'
                ref={ref => inputs.current[1] = ref}
                onChange={e => person.age = e.currentTarget.value}
                />
            </Form.Group>
            <Form.Control type="submit" as={Button} variant="primary">Siguiente</Form.Control>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: 'hide'})}>
                <Toast.Header>
                    <img src={ageSVG} alt="image of two guys and a dog" width="30px" className="mr-2"/>
                    <strong className="mr-auto">Resoluci&oacute;n</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{toastState.response}</p>
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default Seventh