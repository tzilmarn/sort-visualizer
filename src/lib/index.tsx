import { useEffect, useState } from 'react'
import _ from 'lodash'
import Vis from './vis'
import Controls from './toolbar'
import SimulationControlContext, { Speed } from './simulation.context'
import AppTabs from './tabs'
import { algorithms, AlgorithmState, Entry } from './algorithms'

export default function App() {
	const minBarCount = 10
	const maxBarCount = 500

	const [valAlgState, setValAlgState] = useState<
		[Entry[], AlgorithmState | undefined]
	>(() => [
		Array(50)
			.fill(undefined)
			.map(() => ({ id: Math.random().toString(), value: Math.random() })),
		undefined,
	])

	const [values, algState] = valAlgState
	const isSorted = values.every(
		(_, i) => !values[i + 1] || values[i].value < values[i + 1].value
	)

	const [speed, setSpeed] = useState<Speed>(1)
	const [isPlaying, setIsPlaying] = useState(false)

	useEffect(() => {
		if (isPlaying && isSorted) setIsPlaying(false)
	}, [isPlaying, isSorted])

	const setValues = (updater: (values: Entry[]) => Entry[]) =>
		setValAlgState((old) => [updater(old[0]), old[1]])
	const setAlgState = (
		updater: (values: AlgorithmState | undefined) => AlgorithmState | undefined
	) => setValAlgState((old) => [old[0], updater(old[1])])

	const [algName, setAlgName] = useState<keyof typeof algorithms>('bubbleSort')
	useEffect(() => {
		setAlgState(() => undefined)
	}, [algName])

	const sortStep = () => {
		if (isSorted) {
			setIsPlaying(false)
			return
		}

		setValAlgState(([values, algState]) => {
			return algorithms[algName].sortStep([...values], { ...algState })
		})
	}

	const setDatasetSize = (value: number) => {
		value = Math.max(minBarCount, Math.min(maxBarCount, value))

		if (value > values.length)
			setValues((old) => [
				...old,
				...Array(value - values.length)
					.fill(undefined)
					.map(() => ({
						id: Math.random().toString(),
						value: Math.random(),
					})),
			])
		else if (value < values.length)
			setValues((old) => _.dropRight(old, values.length - value))
	}

	const shuffle = () => {
		setValAlgState(([values]) => {
			return [_.shuffle([...values]), undefined]
		})
	}

	const createNewDataset = () =>
		setValues(() =>
			Array(values.length)
				.fill(undefined)
				.map(() => ({ id: Math.random().toString(), value: Math.random() }))
		)

	const instantSort = () => {
		setValues((old) => _.sortBy(old, 'value'))
	}

	useEffect(() => {
		if (!isPlaying) return
		const refreshInterval = 1000 / speed
		const interval = setInterval(sortStep, refreshInterval)
		return () => clearInterval(interval)
	}, [isPlaying, speed])

	return (
		<SimulationControlContext.Provider
			value={{
				minBarCount,
				maxBarCount,
				isPlaying,
				instantSort,
				shuffle,
				createNewDataset,
				datasetSize: values.length,
				setDatasetSize,
				setSpeed,
				speed,
				toggleIsPlaying: () => setIsPlaying((old) => !old),
				isSorted,
				algName: algName,
				setAlgorithm: setAlgName,
				algState,
			}}
		>
			<div className='text-black dark:text-white'>
				<main className='container mx-auto space-y-2 text-white'>
					<div className='h-96 px-4'>
						<Vis boxes={values} />
					</div>
					<div className='px-4'>
						<Controls onStep={sortStep} />
					</div>
					<div className='px-4'>
						<AppTabs />
					</div>
				</main>
			</div>
		</SimulationControlContext.Provider>
	)
}
