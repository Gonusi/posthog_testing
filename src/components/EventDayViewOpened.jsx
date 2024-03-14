import { useState } from "react";
import posthog from "posthog-js";

const DEFAULT_NAME = "day view open";

function DayViewOpened({ onSubmit }) {
  const [name, setName] = useState(DEFAULT_NAME);
  const [state, setState] = useState({
    efficiencyScore__errorCountOnOpen: 3,
  });

  const handleSubmit = () => {
    onSubmit({ name: name ?? DEFAULT_NAME, data: { ...state } });
    posthog.startSessionRecording()
  };

  const handleChange = (e) => {
    let numericalValue = Number(e.target.value);
    if (numericalValue < 0) {
      numericalValue = 0;
    }

    const result = {
      ...state,
      [e.target.name]: numericalValue,
    };

    setState(result);
  };

  return (
    <div style={{ border: "1px solid grey", padding: "1rem" }}>
      <h2>
        1. "Day view open" event, recommend to perform this before everything
        else
      </h2>

      <table>
        <thead>
          <tr>
            <th colSpan={4}>
              <label>
                Event name:{" "}
                <input
                  onChange={(e) => setName(e.target.name)}
                  type="text"
                  value={name}
                  style={{textAlign: 'left'}}
                />
              </label>
            </th>
          </tr>
          <tr>
            <th>Error count on open</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                onChange={handleChange}
                name="efficiencyScore__errorCountOnOpen"
                type="number"
                value={state.efficiencyScore__errorCountOnOpen}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ display: "flex" }}>
        <div>
          <code>
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </code>
          <button onClick={handleSubmit}>Send event to Posthog</button>
        </div>
      </div>
    </div>
  );
}

export default DayViewOpened;




/*
knowing-rival
*/