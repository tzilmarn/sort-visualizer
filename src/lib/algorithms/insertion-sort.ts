import type { Algorithm, AlgorithmState } from '.'
import _ from 'lodash'

interface State extends AlgorithmState {
	name: 'insertionSort'
	sortedCount: number
}

const insertionSort: Algorithm<State> = {
	name: 'insertionSort',
	title: 'Insertion Sort',
	description:
		'Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.',
	wikipediaLink: 'https://en.wikipedia.org/wiki/Insertion_sort',
	sortStep: (values, state) => {
		if (!state || state.name !== 'insertionSort')
			state = { name: 'insertionSort', sortedCount: 0 }

		if (state.sortedCount >= values.length) {
			state.highlight = undefined
			return [values, state]
		}

		const index = state.sortedCount
		for (let j = index; j > 0; j--) {
			if (values[j].value <= values[j - 1].value) {
				const temp = values[j]
				values[j] = values[j - 1]
				values[j - 1] = temp
			} else break
		}

		state.sortedCount += 1
		state.highlight = [values[state.sortedCount]?.id]

		return [values, state]
	},
}
export default insertionSort
