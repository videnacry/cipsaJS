import Alert from 'react-bootstrap/Alert'
import * as First from './1'
import * as Second from './2'
import * as Third from './3'
import * as Fourth from './4'
import * as Fifth from './5'

export const events = {
    name: 'events'
}
const exercises = [First, Second, Third, Fourth, Fifth]

export default ({CodeIframe}) => exercises.map(Exercise => 
    <div className="mb-4 rounded p-2 p-sm-4 bg-secondary">
        <Alert variant="info">{Exercise.statement}</Alert>
        <Exercise.default CodeIframe={CodeIframe}/>
    </div>    
)