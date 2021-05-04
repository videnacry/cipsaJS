import {useState, memo} from 'react'
import Form from 'react-bootstrap/Form'
import {Accordion, Card, Button, Col} from 'react-bootstrap'

export const variable = {
    name: 'variable',
    parent: 'fundaments'
}

const Variable = memo(() => {
    const [age, setAge] = useState(0)

    return(
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
    )
})

export default Variable