import { Algorithm } from '.'
import _ from 'lodash'

const insertionSort: Algorithm = {
	title: 'Insertion Sort',
	description:
		'Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.',
	wikipediaLink: 'https://en.wikipedia.org/wiki/Insertion_sort',
	sortStep: (values) => {
		return _.shuffle(values)
	},
}
export default insertionSort
