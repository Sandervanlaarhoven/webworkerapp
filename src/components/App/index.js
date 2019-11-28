import React, { useCallback, useState } from "react"
import {
  Button,
  Avatar
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './App.css'
import WebworkerComponent from '../WebworkerComponent';
import NormalComponent from '../NormalComponent';

const useStyles = makeStyles({
  avatar: {
    marginBottom: 20,
    width: 80,
    height: 80
  }
})

function App() {
  const classes = useStyles()
  const [mode, setMode] = useState('webworker')

  const switchMode = useCallback(async () => {
    if (mode === 'normal') {
      return setMode('webworker');
    } else {
      return setMode('normal');
    }
  }, [mode, setMode]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Demo app webworkers.</h1>
        <Avatar className={classes.avatar} alt="Remy Sharp" src="https://media.licdn.com/dms/image/C4E03AQGAvLowGH4_rA/profile-displayphoto-shrink_200_200/0?e=1580342400&v=beta&t=4qWDdDCcxwz8qK3lycOz9DqiSB3SflgERw498gur7Ps" />
        <Button variant="contained" color="primary" onClick={() => switchMode()}>
          {mode === 'normal' ? 'Gebruik een webworker' : 'Gebruik geen webworker'}
        </Button>
        <p>
          De app heeft twee mogelijkheden.
          Er kan een actie met webworker worden uitgevoerd en zonder.
        </p>
        <p>
          De app gebruikt nu <b>{mode === 'normal' ? 'geen' : 'wél een'}</b> webworker!
        </p>
      </header>
      {mode === 'normal' ? <NormalComponent/> : <WebworkerComponent/>}
    </div>
  );
}

export default App;
