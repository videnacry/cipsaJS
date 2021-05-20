import {useState, memo} from 'react'
import Form from 'react-bootstrap/Form'
import {Accordion, Card, Button, Col, Alert} from 'react-bootstrap'

export const variable = {
    name: 'variable',
    parent: 'fundaments'
}
const statement = <Alert variant="info" className="mb-4 rounded p-2 p-sm-4">
    <p>Haz que la p&aacute;gina muestre una l&iacute;nea indicando la edad que tendr&aacute; el usuario el a&ntilde;o pr&oacute;ximo.</p>
</Alert>

const Variable = memo(() => {
    const [age, setAge] = useState(0)

    return(
        <>
        {statement}
        <Form onSubmit={(e => e.preventDefault())} className="bg-light p-4 rounded">
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label htmlFor='user-year'>Give us your age, please!</Form.Label>
                    <Form.Control
                        id='user-year'
                        type='number'
                        placeholder='22'
                        value={age} 
                        onInput={({currentTarget: {value}}) => setAge(() => value)}
                    />
                    <Form.Text className='text-muted'>Next year month is not specified...xD</Form.Text>
                </Form.Group>
                <Form.Group as={Col}>
                    <Accordion>
                        <Card>
                            <Card.Header className="d-flex justify-content-center">
                                <Accordion.Toggle eventKey="0" as={Button} variant="primary" size="lg">
                                    Show age in next year!
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>{Number(age) + 1}</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Form.Group>
            </Form.Row>
        </Form>
        </>
    )
})

export default Variable