import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import Vis from './vis'
import Controls from './toolbar'
import SimulationControlContext, { Speed } from './simulation.context'
import AppTabs from './tabs'
import { algorithms } from './algorithms'

export default function App() {
	const [speed, setSpeed] = useState<Speed>(0.5)
	const [isPlaying, setIsPlaying] = useState(false)

	const [values, setValues] = useState(() =>
		Array(50)
			.fill(undefined)
			.map(() => ({ id: Math.random().toString(), value: Math.random() }))
	)

	const [algorithmName, setAlgorithmName] =
		useState<keyof typeof algorithms>('bubbleSort')
	const sortStep = useCallback(
		() =>
			setValues((values) => algorithms[algorithmName].sortStep([...values])),
		[algorithmName, values]
	)

	const setDatasetSize = (value: number) => {
		value = Math.max(0, Math.min(100, value))

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
		setValues((old) => {
			const copy = [...old]
			return _.shuffle(copy)
		})
	}

	const createNewDataset = () => {
		const newValues = Array(values.length)
			.fill(undefined)
			.map(() => ({ id: Math.random().toString(), value: Math.random() }))
		setValues(newValues)
	}

	const instantSort = () => {
		setValues((old) => _.sortBy(old, 'value'))
	}

	const toggleSorting = () => {
		setIsPlaying((old) => !old)
	}
	useEffect(() => {
		if (!isPlaying) return
		const refreshInterval = 100 / speed
		const interval = setInterval(sortStep, refreshInterval)
		return () => clearInterval(interval)
	}, [isPlaying, speed])

	return (
		<SimulationControlContext.Provider
			value={{
				isPlaying,
				instantSort,
				shuffle,
				createNewDataset,
				datasetSize: values.length,
				setDatasetSize,
				setSpeed,
				speed,
				toggleIsPlaying: () => setIsPlaying((old) => !old),
				algorithmName,
				setAlgorithm: setAlgorithmName,
			}}
		>
			<div className='text-black dark:text-white'>
				<main className='container mx-auto space-y-2 text-white'>
					<div className='h-96 px-4'>
						<Vis boxes={values} />
					</div>
					<div className='px-4'>
						<Controls
							isPlaying={isPlaying}
							onPlayToggle={toggleSorting}
							onStep={sortStep}
							onShuffle={shuffle}
							onNewDataset={createNewDataset}
						/>
					</div>
					<div className='px-4'>
						<AppTabs />
					</div>
				</main>
			</div>
		</SimulationControlContext.Provider>
	)
}
