import React, { useCallback, useState } from "react"
import { Button, Grid, CircularProgress, Typography, TextField } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import myWorker from './test.worker'

const useStyles = makeStyles({
	root: {
		textAlign: 'center',
		backgroundColor: '#EAFAF1',
		minHeight: '40vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer: {
		display: 'relative',
		float: 'left',
		marginRight: 10
	},
	runner: {
		marginTop: 20
	},
	counterContainer: {
		marginBottom: 20
	}
})

const WebworkerComponent = () => {
	const classes = useStyles()
	const [counter, setCounter] = useState(0)
	const [dateCounter, setDateCounter] = useState(0)
	const [number, setNumber] = useState(10000)
	const [running, setRunning] = useState(false)
	const worker = new myWorker()

	const setCounterFromEvent = useCallback(async (event) => {
		setDateCounter(event.data)
		setRunning(false)
	}, [setDateCounter, setRunning])

	worker.onmessage = (event) => {
		setCounterFromEvent(event)
	}

	const runWorker = useCallback(async () => {
		setRunning(true)
		worker.postMessage(number)
	}, [number, worker, setRunning])

	const changeNumber = useCallback(async (event) => {
		setNumber(event.target.value)
	}, [setNumber])

	const counterUp = useCallback(async () => {
		setCounter(counter + 1)
	}, [counter, setCounter])

	const counterDown = useCallback(async () => {
		setCounter(counter - 1)
	}, [counter, setCounter])
	
	return <div className={classes.root}>
		<h1>Laat de worker werken!</h1>
		<Grid className={classes.counterContainer} container direction="row" justify="center" alignItems="center" spacing={2}>
			<Grid item>
				<Typography variant="h5" align="center">Teller staat op {counter}</Typography>
			</Grid>
		</Grid>
		<Grid container direction="row" justify="center" alignItems="center" spacing={2}>
			<Grid item>
				<Button className="button" variant="contained" color="primary" onClick={counterUp}>
					Teller ophogen
        		</Button>
			</Grid>
			<Grid item>
				<Button variant="contained" color="primary" onClick={counterDown}>
					Teller verlagen
        		</Button>
			</Grid>
		</Grid>
		<div className={classes.runner}>
			{running ? <div className={classes.loading}>
				<CircularProgress />
				<Typography align="center">resultaat wordt berekend</Typography>
			</div> :
				<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
					<Grid item>
						<Button className="button" variant="contained" color="primary" onClick={runWorker}>
							Run
        				</Button>
					</Grid>
					<Grid item>
						<TextField
							helperText="Hoe hoger hoe langer het duurt"
							label="Nummer"
							value={number || ''}
							onChange={changeNumber}
						/>
					</Grid>
					<Grid item>
						<Typography align="center">{!dateCounter ? '' : `resultaat : ${dateCounter}`}</Typography>
					</Grid>
			</Grid>}
		</div>
	</div>
}

export default WebworkerComponent
