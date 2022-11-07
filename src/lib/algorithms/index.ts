import bubbleSort from './bubble-sort'
import insertionSort from './insertion-sort'

export type Entry = {
	id: string
	value: number
}

export type Algorithm = {
	title: string
	description: string
	wikipediaLink: string
	sortStep: <T extends Entry>(array: T[]) => T[]
}

export const algorithms = {
	bubbleSort,
	insertionSort,
}
