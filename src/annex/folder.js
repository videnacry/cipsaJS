import {memo} from 'react'
import {Row, Col, Button} from 'react-bootstrap'
import folderSVG from './folder.svg'
import {changeAnnex, changeModule, changeTopic} from '../features/directory/slice'
import {useDispatch} from 'react-redux'

const render = (folder, dispatch) => {
    return Object.values(folder.children).map((file, idx) => {
        let action = null
        switch (file.type) {
            case 'annex':
                action = changeAnnex
                break
            case 'module':
                action = changeModule
                break
            case 'topic':
                action = changeTopic
                break
            default:
                alert('wrong dir level')
                break
        }
        if (action === null) return <></>
        return <Button onClick={() => dispatch(action(file.name))} key={'directory-' + idx} variant="outline-primary">
                <img src={folderSVG} alt="folder img" width="100px"/>
                <h6>{file.name}</h6>
            </Button>
        }
    )
}
const Folder = memo(({folder}) => {
    const dispatch = useDispatch()
    return(
        <Row className="justify-content-center">
            {render(folder, dispatch)}
            <Col xs="12" className="mt-2 text-light">
                <div className="d-flex justify-content-center">Icons made by <a href="https://www.flaticon.com/authors/dinosoftlabs" title="DinosoftLabs">DinosoftLabs</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Col>
        </Row>
    )
})

export default Folder