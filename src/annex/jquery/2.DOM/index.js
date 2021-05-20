import Alert from 'react-bootstrap/Alert'
import * as Navigation from './1.navigation'
import * as Manipulation from './2.manipulation'
export const dom = {
    name: 'dom',
    type: 'module'
}

const exercises = [Navigation, Manipulation]
export default ({CodeIframe}) => exercises.map(Exercise => 
    <div className='mb-4 rounded p-2 p-sm-4 bg-secondary'>
        <Alert variant="info">{Exercise.statement}</Alert>
        <Exercise.default CodeIframe={CodeIframe}/>
    </div>
)