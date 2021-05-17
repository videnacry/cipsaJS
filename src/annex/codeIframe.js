import {useEffect, useState, useRef} from 'react'
import CodeView from './codeView'

export default ({initialHTML, initialJS}) => {
    const [html, setHTML] = useState(initialHTML)
    const [js, setJS] = useState(initialJS)
    const htmlFrame = useRef(null)
    const htmlIframe = useRef(null)
    useEffect(() => {
        htmlIframe.current = window.open('', 'jquery')
    })
    useEffect(() => {
        const myScript = document.createElement('script')
        myScript.textContent = 'try{Function(`' + js + '`)()} catch(e){console.log(e)}'
        htmlIframe.current.document.querySelector('html').innerHTML = html
        htmlIframe.current.document.body.append(myScript)
    }, [html, js])
    return(
        <>
        <iframe name="jquery" ref={htmlFrame} width="100%" style={{height: '60vh'}}></iframe>
        <div className="btn-group btn-group-sm d-flex">
            <CodeView code={html} mode="htmlmixed" onChange={htmlText => setHTML(() => htmlText)}/>
            <CodeView code={js} mode="javascript" onChange={jsText => setJS(() => jsText)}/>
        </div>
        </>
    )
}