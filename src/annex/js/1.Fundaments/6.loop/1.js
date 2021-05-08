import {memo, useReducer, useCallback} from 'react'
import {ProgressBar, Row, Col, Button} from 'react-bootstrap'
export const Statement = <p>
    <b>1. </b>{'Crea una aplicación que muestre los números pares comprendidos del 100 al 0 ambos incluidos empleando los tres tipos de bucles'}
    <strong> for</strong>, <strong>while</strong> y <strong>do-while</strong>.
</p>
function reducer(state, {type, bar}) {
    switch (type) {
        case 'startWhile': return {...state, cancelWhile: false}
        case 'cancelWhile': return {...state, barProgress: [], cancelWhile: true}
        case 'addBar': return {...state, barProgress: [...state.barProgress, bar]}
    }
}
const initialState = {
    bars: [
        'info', 'success', 'warning', 'secondary', 'primary', 'dark', 'danger', 'info', 'success', 'warning'
    ],
    barProgress: [],
    whileBar: '',
    cancelWhile: false
}

const First = memo(() => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const whileHandler = useCallback(async () => {
        let iterations = 0
        while (iterations <= 100) {
            const idx = await new Promise(resolve => setTimeout(() => resolve(iterations), 200))
            if (state.cancelWhile === true) {
                break
            }
            dispatch({type: 'addBar', bar: <ProgressBar striped variant={state.bars[(Math.random() * 9).toFixed(0)]} now={3} max={102} label={idx} key={`first-while-bar-${idx}`}/>})
            iterations++
        }
    }, [state.cancelWhile])

    return(
        <>
            <div className="px-2 p-sm-4 py-4 rounded justify-content-center bg-light">
                <Col xs={12}>
                    <ProgressBar>
                        {state.barProgress.slice(0, 34).map(bar => bar)}
                    </ProgressBar>
                    <br/>
                    <ProgressBar>
                        {state.barProgress.slice(34, 68).map(bar => bar)}
                    </ProgressBar>
                    <br/>
                    <ProgressBar>
                        {state.barProgress.slice(68, 101).map(bar => bar)}
                        <ProgressBar striped variant='dark' now={3} max={102}/>
                    </ProgressBar>
                </Col>
                <br/>
                <Button variant="primary" onClick={whileHandler} className="m-auto d-block">Iniciar bucle while</Button>
            </div>
        </>
    )
})

export default First