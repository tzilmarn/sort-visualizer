import { createContext } from 'react'
import { algorithms } from './algorithms'

export type Speed = 0.5 | 1.0 | 2.0 | 5.0 | 10.0
export const allSpeeds: Speed[] = [0.5, 1, 2, 5, 10]

export type SimulationControlContext = {
	maxBarCount: number

	speed: Speed
	setSpeed: (value: Speed) => void

	isPlaying: boolean
	toggleIsPlaying: () => void

	datasetSize: number
	setDatasetSize: (value: number) => void

	shuffle: () => void
	createNewDataset: () => void
	instantSort: () => void

	algorithmName: keyof typeof algorithms
	setAlgorithm: (name: keyof typeof algorithms) => void
}

const SimulationControlContext = createContext<SimulationControlContext>(
	null as any
)
export default SimulationControlContext
