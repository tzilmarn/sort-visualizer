import type { Algorithm, AlgorithmState } from '.'

interface State extends AlgorithmState {
	name: 'bubbleSort'
}

const bubbleSort: Algorithm<State> = {
	name: 'bubbleSort',
	title: 'Bubble Sort',
	description:
		'Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed.',
	wikipediaLink: 'https://en.wikipedia.org/wiki/Bubble_sort',
	sortStep: (values, state) => {
		if (!state || state.name !== 'bubbleSort') state = { name: 'bubbleSort' }

		for (let i = 0; i < values.length - 1; i++)
			if (values[i].value > values[i + 1].value) {
				const temp = values[i]
				values[i] = values[i + 1]
				values[i + 1] = temp
			}

		return [values, state]
	},
}
export default bubbleSort
