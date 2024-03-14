import {useState, useEffect} from 'react'
import constants from '../constants'
import posthog from "posthog-js";

const BASE_NAME = 'day view closed '

function EventDayViewClosed({onSubmit}) {
    const [name, setName] = useState(BASE_NAME)
    const [state, setState] = useState({
        actionCount: 4,
        efficiencyScore__actionCountIncreaseErrorCount: 1, 
        efficiencyScore__actionCountReduceErrorCount: 3,
        efficiencyScore__errorCountChange: -2, 
        efficiencyScore__errorCountOnClose: 1,
        efficiencyScore__errorCountOnOpen: 3, 
        efficiencyScore__errorCountReduced: true, 
        efficiencyScore__errorCountReduceResult: 'success',
        timeSpentSeconds: 5,
    })

    useEffect(() => {
      if (state.efficiencyScore__errorCountReduceResult === 'success') {
        setName(BASE_NAME + constants.success)
      } else {
        setName(BASE_NAME + constants.failure)
      }
    }, [state.efficiencyScore__errorCountReduceResult])

    const handleSubmit = () => {
        onSubmit({name, data: {...state}})
        onSubmit({name: BASE_NAME, data: {...state}})
        posthog.stopSessionRecording()
    }

    const handleChange = (e) => {
        let numericalValue = Number(e.target.value)
        if (numericalValue < 0) {
            numericalValue = 0
        }


        const s1 = {
            ...state,
            [e.target.name]: numericalValue
        }

        const s2 = {
            ...s1,
            efficiencyScore__errorCountChange: s1.efficiencyScore__actionCountIncreaseErrorCount - s1.efficiencyScore__actionCountReduceErrorCount,
            actionCount: s1.efficiencyScore__actionCountIncreaseErrorCount + s1.efficiencyScore__actionCountReduceErrorCount
        } 

        const s3 = {
            ...s2, 
            efficiencyScore__errorCountReduceResult: s2.efficiencyScore__errorCountChange >= 0 ? "failure" : "success",
            efficiencyScore__errorCountReduced: s2.efficiencyScore__errorCountChange >= 0 ? false : true,
            efficiencyScore__errorCountOnClose: s2.efficiencyScore__errorCountOnOpen + s2.efficiencyScore__errorCountChange
        }


        setState(s3)
    }

    return (
        <div style={{ border: "1px solid grey", padding: "1rem" }}>
        <h2>3. "Day view closed" event that includes all results calculated in FE</h2>
        <table>
          <thead>
            <tr>
              <th colSpan={4}><label>Event name: <input  style={{width: 350, textAlign: 'left'}} onChange={e => setName(e.target.name)} type="text" value={name} /></label></th>
            </tr>
            <tr>
              <th>Error count before open dayview</th>
              <th style={{ color: "green" }}>
                Success action count (error +)
              </th>
              <th style={{ color: "red" }}>Failure action count (error -)</th>
              <th>Time spent (seconds)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input onChange={handleChange} name="efficiencyScore__errorCountOnOpen" type="number" value={state.efficiencyScore__errorCountOnOpen} />
              </td>
              <td>
                <input onChange={handleChange} name="efficiencyScore__actionCountReduceErrorCount" type="number" value={state.efficiencyScore__actionCountReduceErrorCount} />
              </td>
              <td>
                <input onChange={handleChange} name="efficiencyScore__actionCountIncreaseErrorCount" type="number" value={state.efficiencyScore__actionCountIncreaseErrorCount} />
              </td>
              <td>
                <input onChange={handleChange} name="timeSpentSeconds" type="number" value={state.timeSpentSeconds} />
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
            <button onClick={handleSubmit}>Send Event to Posthog</button>
          </div>
        </div>
      </div>
    )
}

export default EventDayViewClosed
