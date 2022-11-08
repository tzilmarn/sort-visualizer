import bubbleSort from './bubble-sort'
import insertionSort from './insertion-sort'

export interface AlgorithmState {
	name: string
	highlight?: string[]
}

export type Entry = {
	id: string
	value: number
}

export type Algorithm<State extends AlgorithmState> = {
	name: State['name']
	title: string
	description: string
	wikipediaLink: string
	sortStep: <T extends Entry>(
		array: T[],
		state: State | undefined
	) => [T[], State | undefined]
}

export const algorithms: Record<string, Algorithm<any>> = {
	[bubbleSort.name]: bubbleSort,
	[insertionSort.name]: insertionSort,
}
