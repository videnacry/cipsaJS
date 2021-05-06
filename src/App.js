import {useSelector} from 'react-redux'
import {selectRoot} from './features/directory/slice'
import {Container, Row, Col} from 'react-bootstrap'
import Annex from './annex'
import Nav from './features/directory'

const roots = {annex: <Annex />}

function App() {
  const root = useSelector(selectRoot)
  return (
    <Row className="p-2 pl-4 p-sm-4 bg-dark bg-gradient vh-100 overflow-auto">
      <Col xs="3" sm="2" lg="3">
        <br/>
        <br/>
        <br/>
      </Col>
      <Col xs="12" sm="9" lg="7" className="p-0">
        <Container className="p-0">
          {roots[root]}
        </Container>
      </Col>
      <section className="position-fixed">
        <Nav/>
      </section>
    </Row>
  );
}

export default App;
