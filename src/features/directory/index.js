import {Button, Accordion} from 'react-bootstrap'
const Fundaments = {
    name: 'Fundaments',
    parent: 'js',
    children: {
        Variable: {
            name: 'Variable',
            parent: 'Fundaments'
        },
        DialogBox: {
            name: 'DialogBox',
            parent: 'Root'
        }
    }
}
const Objects = {
    name: 'Objects',
    parent: 'js',
    children: {}
}
const Javascript = {
    name: 'Javascript',
    parent: 'Root',
    children: {
        Fundaments,
        Objects
    }
}
const Jquery = {
    name: 'Jquery',
    parent: 'Root',
    children: {
        Elements: {
            name: 'Elements',
            parent: 'Jquery',
            children: {}
        },
        DOMMatrix: {
            name: 'DOMMatrix',
            parent: 'Jquery',
            children: {}
        },
        Events: {
            name: 'Events',
            parent: 'Jquery',
            children: {}
        },
        Effects: {
            name: 'Effects',
            parent: 'Jquery',
            children: {}
        },
        Forms: {
            name: 'Forms',
            parent: 'Jquery',
            children: {}
        },
        UI: {
            name: 'UI',
            parent: 'Jquery',
            children: {}
        }
    }
}
const Root = {
    name: 'Root',
    parent: null,
    children: {
        Javascript,
        Jquery
    }
}

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
                            <Accordion.Toggle eventKey="0" as={Button} variant="link" className="text-light font-weight-bold text-decoration-none">
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
            return <dd><Button variant="link" className="text-light text-decoration-none">{dir.name}</Button></dd>
        }
    })
}

const Nav = () => {
    return(
        <nav>
            {getDirectoryAsDL(Root)}
        </nav>
    )
}

export default Nav;