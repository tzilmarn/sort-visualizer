import { ComponentProps, useContext } from 'react'
import SimulationControlContext from '../simulation.context'
import { IoAdd as PlusIcon, IoRemove as MinusIcon } from 'react-icons/io5'

type Props = {}

const Button = (props: ComponentProps<'button'>) => (
	<button
		{...props}
		className={`flex items-center justify-center rounded-lg bg-gray-800/30 text-center text-4xl [flex-grow:1] active:bg-indigo-800/80 disabled:bg-gray-800/10 disabled:text-gray-500 ${props.className}`}
	/>
)

export default function DatasetTab({}: Props) {
	const { datasetSize, setDatasetSize } = useContext(SimulationControlContext)

	return (
		<div className='flex gap-2'>
			<div className='flex flex-col gap-1 [flex-grow:1]'>
				<Button
					disabled={datasetSize <= 0}
					onClick={() => setDatasetSize(datasetSize - 5)}
					className='[flex-grow:2]'
				>
					<MinusIcon /> 5
				</Button>
				<Button
					disabled={datasetSize <= 0}
					onClick={() => setDatasetSize(datasetSize - 1)}
					className='[flex-grow:1]'
				>
					<MinusIcon />
				</Button>
			</div>
			<figure className='group flex flex-col items-center justify-center rounded-lg border-2 border-gray-300 p-4 text-center text-gray-300 md:[flex-grow:3]'>
				<span className='text-5xl font-black'>{datasetSize}</span>
				<figcaption className='text-md text-2xl font-bold'>Bars</figcaption>
			</figure>
			<div className='flex flex-col gap-1 [flex-grow:1]'>
				<Button
					disabled={datasetSize >= 100}
					onClick={() => setDatasetSize(datasetSize + 5)}
					className='[flex-grow:2]'
				>
					<PlusIcon /> 5
				</Button>
				<Button
					disabled={datasetSize >= 100}
					onClick={() => setDatasetSize(datasetSize + 1)}
					className='[flex-grow:2]'
				>
					<PlusIcon />
				</Button>
			</div>
		</div>
	)
}
