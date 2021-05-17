import {memo} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import folderSVG from './folder.svg'

const render = files => {
    return Object.values(files.children).map(file => 
        <Button variant="outline-primary">
            <img src={folderSVG} alt="folder img" width="100px"/>
            <h6>{file.name}</h6>
        </Button>
    )
}
const Folder = memo(({files}) => {

    return(
        <Row className="justify-content-center">
            {render(files)}
            <Col xs="12" className="mt-2">
                <div className="d-flex justify-content-center">Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Col>
        </Row>
    )
})

export default Folder