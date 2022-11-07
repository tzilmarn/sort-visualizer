import { useContext, useId } from 'react'
import { algorithms } from '../algorithms'
import SimulationControlContext from '../simulation.context'
import { FaWikipediaW as WikipediaIcon } from 'react-icons/fa'

type Props = {}

export default function AlgorithmTab({}: Props) {
	const { algorithmName, setAlgorithm } = useContext(SimulationControlContext)

	return (
		<div className='flex flex-col gap-4'>
			<select
				value={algorithmName}
				onChange={(e) => setAlgorithm(e.target.value as any)}
				className='rounded-lg bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
			>
				{Object.entries(algorithms).map(([name, { title }]) => (
					<option key={name} value={name}>
						{title}
					</option>
				))}
			</select>

			<p className='leading-snug text-gray-500 dark:text-gray-200'>
				{algorithms[algorithmName].description}
			</p>
			<a
				className='inline-block flex items-center gap-2 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-300'
				href={algorithms[algorithmName].wikipediaLink}
			>
				<WikipediaIcon /> Wikipedia
			</a>
		</div>
	)
}
