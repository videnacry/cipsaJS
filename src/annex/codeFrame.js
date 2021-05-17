import {useEffect, useState, useRef} from 'react'
import CodeView from './codeView'

export default ({initialHTML, initialJS}) => {
    const [html, setHTML] = useState(initialHTML)
    const [js, setJS] = useState(initialJS)
    const htmlFrame = useRef(null)
    useEffect(() => {
        const myScript = document.createElement('script')
        myScript.textContent = 'try{Function(`' + js + '`)()} catch(e){console.log(e)}'
        htmlFrame.current.innerHTML = html
        htmlFrame.current.append(myScript)
    }, [html, js])
    return(
        <>
        <div ref={htmlFrame}></div>
        <div className="btn-group btn-group-sm d-flex">
            <CodeView code={html} mode="htmlmixed" onChange={htmlText => setHTML(() => htmlText)}/>
            <CodeView code={js} mode="javascript" onChange={jsText => setJS(() => jsText)}/>
        </div>
        </>
    )
}