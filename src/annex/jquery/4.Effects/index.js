import * as First from './1'
import * as Second from './2'
import * as Third from './3'

export const effects = {
    name: 'effects',
    type: 'module'
}
const exercises = [First, Second, Third]

export default ({CodeIframe}) => exercises.map(Exercise =>
    <div className="mb-4 rounded p-2 p-sm-4 bg-secondary">
        <div className="alert alert-info">{Exercise.statement}</div>
        <Exercise.default CodeIframe={CodeIframe}/>
    </div>
)