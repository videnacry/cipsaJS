import {memo, useReducer, useCallback} from 'react'
import {Form, Toast, Button} from 'react-bootstrap'
import compareSVG from './compare.svg'

export const Statement = <dl>
    <dd>{'2. Crea una página que solicite el nombre de dos personas y sus respectivas edades y después muestre el mensaje:'}</dd>
    <dl className="ml-4">
       <dd>{'√ "<nombre_persona_A> es mayor que <nombre_persona_B>" -> Si una persona es mayor que otra.'}</dd> 
       <dd>{'√ "Ambas personas tienen la misma edad" -> Si la edad de ambas personas es la misma.'}</dd>
    </dl>
</dl>

const persons = {
    a: {
        name: 'a',
        age: ''
    },
    b: {
        name: 'b',
        age: ''
    }
}
const personsReducer = ({type, person: {name, age}}) => {
    switch (type) {
        case 'setNameA': return persons.a.name = name
        case 'setNameB': return persons.b.name = name
        case 'setAgeA': return persons.a.age = Number(age) > 0 ? age : 0
        case 'setAgeB': return persons.b.age = Number(age) > 0 ? age : 0
        default: break
    }
}

const toast = {
    show: false,
    affirmation: ''
}
const getAffirmation = () => {
    const {a, b} = persons
    if (!Number(a.age) > 0 || !Number(b.age) > 0) return 'No ha sido posible comparar los valores adquiridos :( , asegurese que sean mayor a 0'
    if (a.age > b.age) {
        return `${a.name} es mayor que ${b.name}.`
    } else if (b.age > a.age) {
        return `${b.name} es mayor que ${a.name}.`
    } else if (b.age === a.age) {
        return `Ambas personas tienen la misma edad.`
    }
}
const toastReducer = (state, action) => {
    switch (action.type) {
        case 'show': return {...state, show: true}
        case 'hide': return {...state, show: false}
        case 'setAffirmation': return {...state, affirmation: getAffirmation()}
    }
}

const Second = memo(() => {
    const [toastState, toastDispatch] = useReducer(toastReducer, toast)
    const submitHandler = useCallback(() => {
        toastDispatch({type: 'setAffirmation'})
        toastDispatch({type: 'show'})
    }, [])
    return(
        <>
        <Form onSubmit={e => e.preventDefault()} className="bg-light p-4 rounded">
            <div className="row">
                <div className="col pt-3 border-right border-secondary">
                    <h1 className="h5 pb-2">Persona a</h1>
                    <Form.Group>
                        <Form.Label htmlFor="a-name">Ingresa un nombre</Form.Label>
                        <Form.Control id="a-name" type="text" onChange={e => personsReducer({type: 'setNameA', person: {name: e.currentTarget.value}})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label html="a-age">Ingresa una edad</Form.Label>
                        <Form.Control id="a-age" type="Number" min="1" onChange={e => personsReducer({type: 'setAgeA', person: {age: e.currentTarget.value}})}/>
                    </Form.Group>
                </div>
                <div className="col pt-3 border-secondary">
                    <h1 className="h5 pb-2">Persona b</h1>
                    <Form.Group>
                        <Form.Label htmlFor="b-name">Ingresa un nombre</Form.Label>
                        <Form.Control id="b-name" type="text" onChange={e => personsReducer({type: 'setNameB', person: {name: e.currentTarget.value}})}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label html="b-age">Ingresa una edad</Form.Label>
                        <Form.Control id="b-age" type="Number" min="1" onChange={e => personsReducer({type: 'setAgeB', person: {age: e.currentTarget.value}})}/>
                    </Form.Group>
                </div>
            </div>
            <br/>
            <Form.Control type="submit" as={Button} variant="primary" onClick={submitHandler}>Enviar</Form.Control>
        </Form>
        <br/>
        <div className="d-flex justify-content-center">
            <Toast show={toastState.show} onClose={() => toastDispatch({type: "hide"})}>
                <Toast.Header>
                    <img src={compareSVG} alt="compare img" width="30px" className="mr-2"/>
                    <strong className="mr-auto">Resultado</strong>
                    <small>Like &#x2661;</small>
                </Toast.Header>
                <Toast.Body>
                    <p>{toastState.affirmation}</p>
                    <div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </Toast.Body>
            </Toast>
        </div>
        </>
    )
})

export default Second