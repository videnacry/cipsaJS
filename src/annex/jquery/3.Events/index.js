import Alert from 'react-bootstrap/Alert'
import * as First from './1'

export const events = {
    name: 'events'
}
const exercises = [First]

export default ({CodeIframe}) => exercises.map(Exercise => 
    <div className="mb-4 rounded p-2 p-sm-4 bg-secondary">
        <Alert variant="info">{Exercise.statement}</Alert>
        <Exercise.default CodeIframe={CodeIframe}/>
    </div>    
)