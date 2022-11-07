import { useContext, useId } from 'react'
import { algorithms } from '../algorithms'
import SimulationControlContext from '../simulation.context'
import { FaWikipediaW as WikipediaIcon } from 'react-icons/fa'

type Props = {}

export default function AlgorithmTab({}: Props) {
	const algNameId = useId()
	const { algorithmName, setAlgorithm } = useContext(SimulationControlContext)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-1'>
				<label htmlFor={algNameId} className='text-md text-gray-400'>
					Algorithm
				</label>
				<select
					id={algNameId}
					value={algorithmName}
					onChange={(e) => setAlgorithm(e.target.value as any)}
					className='appearance-none rounded-lg bg-gray-800 px-4 py-2'
				>
					{Object.entries(algorithms).map(([name, { title }]) => (
						<option key={name} value={name}>
							{title}
						</option>
					))}
				</select>
			</div>
			<p className='text-gray-200'>{algorithms[algorithmName].description}</p>
			<a
				className='inline-block flex items-center gap-2 rounded-lg px-2 py-1'
				href={algorithms[algorithmName].wikipediaLink}
			>
				<WikipediaIcon /> Wikipedia
			</a>
		</div>
	)
}
