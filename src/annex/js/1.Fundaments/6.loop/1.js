import {memo, useReducer, useCallback} from 'react'
import {ProgressBar, Row, Col, Button} from 'react-bootstrap'
export const Statement = <p>
    <b>1. </b>{'Crea una aplicación que muestre los números pares comprendidos del 100 al 0 ambos incluidos empleando los tres tipos de bucles'}
    <strong> for</strong>, <strong>while</strong> y <strong>do-while</strong>.
</p>
function reducer(state, {type, bar, whileHandler}) {
    switch (type) {
        case 'startWhile':
            whileCanceled = false
            whileIterations = 0
            return {...state, barProgress: [], whileHandler, whileButton: 'Cancelar bucle while'}
        case 'cancelWhile':
            whileCanceled = true
            return {...state, whileHandler, whileButton: 'Iniciar bucle while'}
        case 'addBar':
            whileIterations += 2
            return {...state, barProgress: [...state.barProgress, bar]}
    }
}

const initialState = {
    bars: [
        'info', 'success', 'warning', 'secondary', 'primary', 'dark', 'danger', 'info', 'success', 'warning'
    ],
    barProgress: [],
    whileHandler: undefined,
    whileButton: 'Iniciar bucle while'
}
let whileIterations = 0
let whileCanceled = false
const First = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const handlers = {
        startWhile: useCallback(async () => {
            dispatch({type: 'startWhile', whileHandler: handlers.cancelWhile})
            while (whileIterations <= 100) {
                const idx = await new Promise(resolve => setTimeout(() => resolve(whileIterations), 200))
                if (whileCanceled === true) break
                dispatch({
                    type: 'addBar',
                    bar: <ProgressBar striped variant={state.bars[(Math.random() * 9).toFixed(0)]} now={1} max={25} label={idx} key={`first-while-bar-${idx}`}/>
                })
            }
        }, []),
        cancelWhile: useCallback(() => {
            dispatch({type: 'cancelWhile', whileHandler: handlers.startWhile})
        }, []),
    }

    return(
        <>
            <div className="px-2 p-sm-4 py-4 rounded justify-content-center bg-light">
                <Col xs={12}>
                    <ProgressBar>
                        {state.barProgress.slice(0, 25).map(bar => bar)}
                    </ProgressBar>
                    <br/>
                    <ProgressBar>
                        {state.barProgress.slice(25, 51).map(bar => bar)}
                    </ProgressBar>
                </Col>
                <br/>
                <Button variant="primary" onClick={state.whileHandler || handlers.startWhile} className="m-auto d-block">{state.whileButton}</Button>
            </div>
        </>
    )
})

export default First