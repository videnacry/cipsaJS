import {useSelector} from 'react-redux'
import {selectRoot} from './features/directory/slice'
import {Container, Row, Col} from 'react-bootstrap'
import Annex from './annex'
import Nav from './features/directory'

const roots = {annex: <Annex />}

function App() {
  const root = useSelector(selectRoot)
  console.log(root)
  return (
    <Row className="p-4 bg-dark bg-gradient vh-100 overflow-auto">
      <Col xs="3" sm="2" lg="3">
      </Col>
      <Col xs="9" sm="9" lg="7">
        <Container>
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
