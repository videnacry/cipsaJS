import {memo, useReducer, useState, useCallback, useRef} from 'react'
import {Card, Form, ListGroup, Col, Row, Image, Modal, Button} from 'react-bootstrap'
import bananaImg from './banana.svg'
import orangeImg from './naranja.svg'
import appleImg from './manzana.svg'

export const dialogBox = {
    name: 'dialogBox',
    parent: 'fundaments'
}

const cart = {
    apple: {
        name: 'apple',
        price: 2.00,
        amount: 0,
        img: appleImg,
        freepikLink: <div>Iconos diseñados por <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
    },
    orange: {
        name: 'orange',
        price: 2.50,
        amount: 0,
        img: orangeImg,
        freepikLink: <div>Iconos diseñados por <a href="https://www.flaticon.es/autores/mynamepong" title="mynamepong">mynamepong</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div>
    },
    banana: {
        name: 'banana',
        price: 1.75,
        amount: 0,
        img: bananaImg,
        freepikLink: <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    }
}
const offer = 0.08
const changeCart = (state, action) => {
    switch (action.type) {
        case 'change_amount': return {...state, [action.name]: {...state[action.name], amount: action.amount}}
        default: return state
    }
}
const DialogBox = memo(() => {
    const [cartState, cartDispatch] = useReducer(changeCart, cart)
    const [show, setShow] = useState(false)
    const toggleShow = useCallback(() => setShow(prevState => !prevState), [])
    const priceSum = useRef(0)
    const updatePriceSum = useCallback(() => {
      priceSum.current = Object.values(cartState).reduce((accumulate, value) => accumulate + (value.price * value.amount), 0)
    }, [cartState])
    
    return(
        <>
        {updatePriceSum()}
        <ListGroup>
            {Object.values(cartState).map(fruit => (
                <ListGroup.Item>
                    <Row className="align-items-center">
                        <Col md="5" sm="8" xs="12">
                            <Card className="bg-light">
                                <Card.Title>{fruit.name}</Card.Title>
                                {fruit.freepikLink}
                            </Card>
                        </Col>
                        <Col xs="3" sm="3" md="2" lg="2" xl="1">
                            <Image src={fruit.img} alt="" thumbnail/>
                        </Col>
                        <Col>
                            <Card className="bg-light">
                                <h6>Kg price</h6>
                                <Card.Title className="text-center">{`${fruit.price}€`}</Card.Title>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <h6>amount</h6>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={fruit.amount} 
                                    onChange={e =>
                                        cartDispatch({
                                            type: 'change_amount',
                                            name: fruit.name,
                                            amount: e.currentTarget.value
                                        }
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </ListGroup.Item>
            ))}
            <br />
            <ListGroup>
                <ListGroup.Item>
                    <Row>
                        <Col>
                            <Card>
                                <Card.Header>
                                    <Card.Title>Offer</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>{`Less ${offer} of the total price!`}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <h3 className="text-success">{`-${priceSum.current * offer}€`}</h3>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Button variant="primary" onClick={toggleShow} size="lg" block>Total price</Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
        </ListGroup>
        <Modal show={show} onHide={toggleShow}>
            <Modal.Header closeButton>
                <Modal.Title>El precio de la compra es:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`${priceSum.current - (priceSum.current * offer)} Euros`}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={toggleShow}>Deny</Button>
                <Button variant='primary' onClick={toggleShow}>Accept</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
})

export default DialogBox