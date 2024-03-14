import { useEffect, useState } from "react";
import { generate } from "boring-name-generator";
import DayViewClosed from "./components/EventDayViewClosed";
import DayViewOpened from "./components/EventDayViewOpened";
import posthog from "posthog-js";
import DayViewChange from "./components/EventDayViewChange";
import { SnackbarProvider, useSnackbar } from "notistack";

function App() {
  const [email] = useState(`${generate().dashed}@fakeemail.com`);
  const { enqueueSnackbar } = useSnackbar();
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (initialised) return;
    setInitialised(true);
    posthog.init("phc_PHqmIEH61jJPStZ2BSY1y9LafpKnoNDlE8IEyPZ3eG2", {
      api_host: "https://app.posthog.com",
    });
    posthog.identify(email, { name: email, email });
    console.log(
      "Initialised posthog with key: ",
      "phc_ACu0UmEIujJJGkT8hHgRn7hkw3tnbdhAmVO8soGzROw",
      " Identified with email:",
      email
    );
  }, [initialised, email]);

  const handleSubmit = ({ name, data }) => {
    console.log("Will post event:'", name, "' with data:", data);
    posthog.capture(name, data);
    enqueueSnackbar("Event was (hopefully) sent", { variant: "success" });
  };

  return (
    <>
      <style>
        {`
        table {
          border-collapse: collapse;
        }
        td, th {
          border: 1px solid black;
          padding: 0.5rem;
          font-size: 0.8rem;
        }
        input {
          text-align: right;
          padding: 0.25rem;
        }
      `}
      </style>

      <div style={{ padding: "2rem" }}>
        <h1>Posthog event test</h1>
        <label>
          Current session user name: <b>"{email}" </b>.<br /> Refresh to start
          new session.{" "}
          <i>Remember, each session is being recorded in Posthog.</i>
        </label>
        <br />
        <br />
        <br />
        <DayViewOpened onSubmit={handleSubmit} />
        <DayViewChange onSubmit={handleSubmit} />
        <DayViewClosed onSubmit={handleSubmit} />
      </div>
    </>
  );
}

const SnackApp = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <App />
    </SnackbarProvider>
  );
};

export default SnackApp;
