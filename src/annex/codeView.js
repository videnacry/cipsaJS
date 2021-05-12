import 'codemirror/lib/codemirror.css'
import CodeMirror from 'codemirror'
import 'codemirror/theme/ayu-mirage.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/htmlmixed/htmlmixed'
import {useEffect, useState, useRef} from 'react'
import {Modal, Button} from 'react-bootstrap'
import './codeView.css'

export default ({code, mode, onChange}) => {
    const [show, setShow] = useState(false)
    const textarea = useRef(null)
    useEffect(() => {
        if (show) {
            const codeMirror = CodeMirror.fromTextArea(textarea.current, {
                theme: 'ayu-mirage', lineNumbers: true, mode
            })
            codeMirror.on('change', e => {
                e.save()
                onChange(textarea.current.value)
            })
        }
    }, [show])

    return(
        <>
        <Button variant="primary" onClick={() => setShow(prev => !prev)}>Mostrar editor {mode}</Button>
        <Modal show={show} onHide={() => setShow(() => false)} dialogClassName="code-view-c mw-100">
            <Modal.Header closeButton>
                <Modal.Title>C&oacute;digo {mode}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea ref={textarea}>{code}</textarea>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
        </>
    )
}