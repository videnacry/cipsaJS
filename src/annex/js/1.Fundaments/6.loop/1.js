import {memo, useReducer, useCallback} from 'react'
import {ProgressBar, Row, Col, Button} from 'react-bootstrap'
export const Statement = <p>
    <b>1. </b>{'Crea una aplicación que muestre los números pares comprendidos del 100 al 0 ambos incluidos empleando los tres tipos de bucles'}
    <strong> for</strong>, <strong>while</strong> y <strong>do-while</strong>.
</p>
const startLoop = (loop, handler) => ({type: 'start', loop, handler, buttonContent: `Cancelar bucle ${loop.name}`})
const cancelLoop = (loop, handler) => ({type: 'cancel', loop, handler, buttonContent: `Iniciar bucle ${loop.name}`})
const addBar = (loop, idx) => ({
    type: 'addBar', loop, idx,
    bar: <ProgressBar striped variant={bars[(Math.random() * 9).toFixed(0)]} now={1} max={25} label={idx} key={`first-while-bar-${idx}`}/>
})

function reducer(state, {type, bar, handler, loop, buttonContent, idx}) {
    switch (type) {
        case 'start':
            loop.canceled = false
            loop.iterations = 0
            return {...state, progress: [], handler, buttonContent}
        case 'cancel':
            loop.canceled = true
            return {...state, handler, buttonContent}
        case 'addBar':
            loop.iterations = idx + 2
            return {...state, progress: [...state.progress, bar]}
    }
}

const initialState = {
    progress: [],
    handler: undefined,
    buttonContent: 'Iniciar bucle'
}
const bars = [
    'info', 'success', 'warning', 'secondary', 'primary', 'dark', 'danger', 'info', 'success', 'warning'
]

let loop = {
    while: {
        name: 'while',
        iterations: 0,
        canceled: false
    },
    for: {
        name: 'for',
        iterations: 0,
        canceled: false
    },
    do: {
        name: 'do',
        iterations: 0,
        canceled: false
    }
}

const First = memo(() => {
    const [whileState, whileDispatch] = useReducer(reducer, initialState)
    const [forState, forDispatch] = useReducer(reducer, initialState)
    const [doState, doDispatch] = useReducer(reducer, initialState)
    
    const startWhile = useCallback(async () => {
        whileDispatch(startLoop(loop.while, cancelWhile))
        while (loop.while.iterations <= 100) {
            const idx = await new Promise(resolve => setTimeout(() => resolve(loop.while.iterations), 200))
            if (loop.while.canceled === true) break
            whileDispatch(addBar(loop.while, idx))
        }
    }, [])
    const cancelWhile = useCallback(() => whileDispatch(cancelLoop(loop.while, startWhile)), [])

    const startFor = useCallback(async () => {
        for (forDispatch(startLoop(loop.for, cancelFor)); loop.for.iterations <= 100; forDispatch(addBar(loop.for, loop.for.iterations))) {
            const idx = await new Promise(resolve => setTimeout(() => resolve(loop.for.iterations), 200))
            if (loop.for.canceled === true) break
        }
    }, [])
    const cancelFor = useCallback(() => forDispatch(cancelLoop(loop.for, startFor)) , [])

    const startDo = useCallback(async () => {
        doDispatch(startLoop(loop.do, cancelDo))
        do {
            const idx = await new Promise(resolve => setTimeout(() => resolve(loop.do.iterations), 200))
            if (loop.do.canceled === true) break
            doDispatch(addBar(loop.do, idx))
        } while (loop.do.iterations <= 100)
    })
    const cancelDo = useCallback(() => doDispatch(cancelLoop(loop.do, startDo)))
    return(
        <>
            <div className="px-2 p-sm-4 py-4 rounded justify-content-center bg-light">
                <Col xs={12} className='mb-2 mb-sm-3 rounded border border-primary py-3'>
                    <ProgressBar className="mb-2 mb-sm-3 border border-dark">
                        {whileState.progress.slice(0, 25).map(bar => bar)}
                    </ProgressBar>
                    <ProgressBar className="mb-3 border border-dark">
                        {whileState.progress.slice(25, 51).map(bar => bar)}
                    </ProgressBar>
                    <Button variant="primary" onClick={whileState.handler || startWhile} className="m-auto d-block">{whileState.buttonContent}</Button>
                </Col>
                <Col xs={12} className='mb-2 mb-sm-3 rounded border border-primary py-3'>
                    <ProgressBar className="mb-2 mb-sm-3 border border-dark">
                        {forState.progress.slice(0, 25).map(bar => bar)}
                    </ProgressBar>
                    <ProgressBar className="mb-3 border border-dark">
                        {forState.progress.slice(25, 51).map(bar => bar)}
                    </ProgressBar>
                    <Button variant="primary" onClick={forState.handler || startFor} className="m-auto d-block">{forState.buttonContent}</Button>
                </Col>
                <Col xs={12} className="mb-2 mb-sm-3 rounded border border-primary py-3">
                    <ProgressBar className="mb-2 mb-sm-3 border border-dark">
                        {doState.progress.slice(0, 25).map(bar => bar)}
                    </ProgressBar>
                    <ProgressBar className="mb-3 border border-dark">
                        {doState.progress.slice(25, 51).map(bar => bar)}
                    </ProgressBar>
                    <Button variant="primary" onClick={doState.handler || startDo} className="m-auto d-block">{doState.buttonContent}</Button>
                </Col>
            </div>
        </>
    )
})

export default First