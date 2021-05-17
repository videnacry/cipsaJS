import {Navbar, Button, Accordion} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {changePath, selectState} from './slice'
import {annex} from '../../annex'

const setParent = (dirObj) => {
    Object.values(dirObj.children).map(child => {
        child.parent = dirObj
        if (child.children) {
            setParent(child)
        }
        return child
    })
}
setParent(annex)

const getPathArray = dirObj => {
    if (dirObj.parent) {
        return [...getPathArray(dirObj.parent), dirObj.name]
    } else {
        return [dirObj.name]
    }
}

const Nav = () => {
    const dispatch = useDispatch()
    const state = useSelector(selectState)
    const getDirectoryAsDL = ({children}) => {
        if (!children) {
            return <p>There is not children object in parameter</p>
        }
        return Object.values(children).map(dir => {
            if (dir.children) {
                return(
                    <dl className='m-1'>
                        <Accordion>
                            <dt>
                                <Accordion.Toggle 
                                eventKey="0" as={Button} variant="warning" 
                                className="text-light font-weight-bold text-decoration-none"
                                onClick={() => dispatch(changePath(getPathArray(dir)))}
                                >
                                    {dir.name}
                                </Accordion.Toggle>
                            </dt>
                            <Accordion.Collapse eventKey="0">
                                <dl className='m-1'>{getDirectoryAsDL(dir)}</dl>
                            </Accordion.Collapse>
                        </Accordion>
                    </dl>
                )
            } else {
                return(
                    <dd>
                        <Button variant="primary" className="text-light text-decoration-none" 
                        onClick={() => dispatch(changePath(getPathArray(dir)))}
                        >
                            {dir.name}
                        </Button>
                    </dd>
                ) 
            }
        })
    }
    return(
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="bg-danger"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Navbar className="d-block">
                    {getDirectoryAsDL(annex)}
                </Navbar>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Nav;