import { useContext } from 'react'
import { algorithms } from '../algorithms'
import SimulationControlContext from '../simulation.context'
import { FaWikipediaW as WikipediaIcon } from 'react-icons/fa'

type Props = {}

export default function AlgorithmTab({}: Props) {
	const { algName, algState, setAlgorithm } = useContext(
		SimulationControlContext
	)

	return (
		<div className='flex flex-col gap-4'>
			<select
				value={algName}
				onChange={(e) => setAlgorithm(e.target.value as any)}
				className='rounded-lg bg-gray-300 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
			>
				{Object.entries(algorithms).map(([name, { title }]) => (
					<option key={name} value={name}>
						{title}
					</option>
				))}
			</select>

			{algState && (
				<div>
					<pre className='rounded-lg bg-gray-200 p-4 text-gray-600 dark:bg-gray-800 dark:text-gray-200'>
						// Current internal state of algorithm
						<br />
						{JSON.stringify(algState, null, 2)}
					</pre>
				</div>
			)}

			<p className='leading-snug text-gray-500 dark:text-gray-200'>
				{algorithms[algName].description}
			</p>
			<a
				className='inline-block flex items-center gap-2 rounded-lg px-2 py-1 text-gray-700 dark:text-gray-300'
				href={algorithms[algName].wikipediaLink}
			>
				<WikipediaIcon /> Wikipedia
			</a>
		</div>
	)
}
