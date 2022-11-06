import { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import _ from 'lodash'

type Entry = {
	id: string
	value: number
}

type Algorithm = {
	title: string
	sortStep: <T extends Entry>(array: T[]) => T[]
}

export default function App() {
	const rangeInputId = useId()

	const [simulationSpeed, setSimulationSpeed] = useState(0.5)
	const [isPlaying, setIsPlaying] = useState(false)

	const algorithms = {
		bubbleSort: {
			title: 'Bubble Sort',
			sortStep: (values) => {
				for (let i = 0; i < values.length - 1; i++)
					if (values[i].value > values[i + 1].value) {
						const temp = values[i]
						values[i] = values[i + 1]
						values[i + 1] = temp
					}
				return values
			},
		} as Algorithm,
	}

	const [currentAlgorithmName, setCurrentAlgorithmName] =
		useState<keyof typeof algorithms>('bubbleSort')
	const currentAlgorithm = algorithms[currentAlgorithmName]
	const sortStep = () =>
		setValues((values) => currentAlgorithm.sortStep([...values]))

	const [values, setValues] = useState(() =>
		Array(50)
			.fill(undefined)
			.map(() => ({ id: Math.random().toString(), value: Math.random() }))
	)

	const handleIncrease = () => {
		setValues((old) => [
			...old,
			{ id: Math.random().toString(), value: Math.random() },
		])
	}

	const handleDecrease = () => {
		setValues((old) => _.dropRight(old))
	}

	const shuffle = () => {
		setValues((old) => {
			const copy = [...old]
			return _.shuffle(copy)
		})
	}

	const newDataset = () => {
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
		const refreshInterval = 100 / simulationSpeed
		const interval = setInterval(sortStep, refreshInterval)
		return () => clearInterval(interval)
	}, [isPlaying, simulationSpeed])

	return (
		<div className='h-screen bg-black'>
			<main className='container mx-auto space-y-2 p-16 text-white'>
				<motion.div className='flex h-96 gap-1' layout>
					{values.map(({ value, id }) => (
						<motion.div
							key={id}
							layoutId={id}
							initial={{ scaleY: 0 }}
							animate={{ scaleY: Math.max(0.01, value) }}
							style={{ originY: 1 }}
							className='h-full w-full origin-bottom rounded-sm bg-indigo-500'
							whileHover={{ y: -8 }}
							whileDrag={{ y: 0 }}
							dragConstraints={{ bottom: 0 }}
						/>
					))}
				</motion.div>
				<select
					className='appearance-none rounded bg-indigo-900 px-4 py-2'
					value={currentAlgorithmName}
					onChange={(e) =>
						setCurrentAlgorithmName(
							e.currentTarget.value as keyof typeof algorithms
						)
					}
				>
					{Object.entries(algorithms).map(([name, { title }]) => (
						<option
							key={name}
							value={name}
							selected={name === currentAlgorithmName}
						>
							{title}
						</option>
					))}
				</select>
				<div className='flex items-center gap-2'>
					<button
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={handleDecrease}
					>
						-
					</button>
					<span>{values.length}</span>
					<button
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={handleIncrease}
					>
						+
					</button>
				</div>
				<div className='flex gap-2'>
					<button
						disabled={isPlaying}
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={sortStep}
					>
						Sort Step
					</button>
					<button
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={shuffle}
					>
						Shuffle
					</button>
					<button
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={toggleSorting}
					>
						{isPlaying ? 'Stop Sorting' : 'Start Sorting'}
					</button>
					<button
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={newDataset}
					>
						New Dataset
					</button>
					<button
						className='rounded border border-blue-600 px-4 py-1 text-2xl hover:bg-blue-600 disabled:opacity-40'
						onClick={instantSort}
					>
						Instant Sort
					</button>
				</div>
				<div>
					<label htmlFor={rangeInputId}>Speed</label>
					<input
						id={rangeInputId}
						type='range'
						min={0.1}
						max={1}
						step={0.05}
						value={simulationSpeed}
						onChange={(e) => setSimulationSpeed(+e.currentTarget.value)}
					/>
				</div>
			</main>
		</div>
	)
}
