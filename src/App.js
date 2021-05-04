import {useSelector} from 'react-redux'
import {selectRoot} from './features/directory/slice'
import {Container, Row} from 'react-bootstrap'
import Annex from './annex'
import Nav from './features/directory'

const roots = {annex: <Annex />}

function App() {
  const root = useSelector(selectRoot)
  console.log(root)
  return (
    <Row className="p-4 bg-dark bg-gradient vh-100">
      <section>
        <Nav/>
      </section>
      <Container>
        {roots[root]}
      </Container>
    </Row>
  );
}

export default App;
