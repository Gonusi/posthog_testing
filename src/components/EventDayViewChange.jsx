import {useState} from 'react'

const DEFAULT_NAME = 'day view change'

function DayViewChange({onSubmit}) {
    const [name, setName] = useState(DEFAULT_NAME)
    const [state, setState] = useState({
        efficiencyScore__errorCountBeforeEvent: 3,
        efficiencyScore__errorCountAfterEvent: 2,
        efficiencyScore__errorCountReduced: true,
        efficiencyScore__errorCountReduceResult: 'success',
    })

    const handleSubmit = () => {
        onSubmit({name: name ?? DEFAULT_NAME, data: {...state}})
    }

    const handleChange = (e) => {
      let result = state;

        if (e.target.name === 'efficiencyScore__errorCountBeforeEvent') {
          result = {
            ...state,
            efficiencyScore__errorCountBeforeEvent: Number(e.target.value),
            efficiencyScore__errorCountAfterEvent: Number(e.target.value) + (state.efficiencyScore__errorCountReduced ? -1 : 1)
          }
        }

        // Note that useEffect hooks should instead probably listen to changes to those inputs, and adjust state accordingly instead of all logic being here
        // But it'll do for this test
        if (e.target.name === 'efficiencyScore__errorCountReduceResult') {
          const isSuccess = e.target.value === 'success'
          result = {
            ...state,
            efficiencyScore__errorCountReduceResult: e.target.value,
            efficiencyScore__errorCountReduced: isSuccess ? true : false,
            efficiencyScore__errorCountAfterEvent: state.efficiencyScore__errorCountBeforeEvent + (isSuccess ? -1 : 1)
          }
        }


      setState(result)
    }

    return (
        <div style={{ border: "1px solid grey", padding: "1rem" }}>
        <h2>2. "Day view change" event, can be a fragment drag or addition of new fragment</h2>
        <table>
          <thead>
            <tr>
              <th colSpan={2}><label>Event name (resets to default on reload): <input onChange={e => setName(e.target.name)} type="text" value={name} /></label></th>
            </tr>
            <tr>
              <th>Error count before event</th>
              <th>Has action successfully reduced count of errors?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input onChange={handleChange} name="efficiencyScore__errorCountBeforeEvent" type="number" value={state.efficiencyScore__errorCountBeforeEvent} />
              </td>
              <td>
                <select onChange={handleChange} name="efficiencyScore__errorCountReduceResult" value={state.efficiencyScore__errorCountReduceResult}>
                    <option value="success">Success</option>
                    <option value="failure">Failure</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ display: "flex" }}>
          <div>
            <code>
              <pre>
                {JSON.stringify(state, null, 2)}
              </pre>
            </code>
            <button onClick={handleSubmit}>Send event to Posthog</button>
          </div>
        </div>
      </div>
    )
}

export default DayViewChange