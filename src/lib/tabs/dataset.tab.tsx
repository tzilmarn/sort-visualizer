import { ComponentProps, useContext } from 'react'
import SimulationControlContext from '../simulation.context'

type Props = {}

const Button = (props: ComponentProps<'button'>) => (
	<button
		{...props}
		className={`flex items-center justify-center rounded-lg bg-gray-200 p-2 text-center text-xl font-black text-gray-600 [flex-grow:1] hover:bg-primary-500/20 active:bg-primary-400/80 disabled:text-gray-500 dark:bg-gray-800/30 dark:text-gray-200 dark:active:bg-primary-800/80 dark:disabled:bg-gray-800/10 ${props.className}`}
	/>
)

export default function DatasetTab({}: Props) {
	const { datasetSize, setDatasetSize, createNewDataset, maxBarCount } =
		useContext(SimulationControlContext)

	return (
		<div className='flex flex-col gap-4 divide-primary-500/30'>
			<div className='grid grid-flow-col grid-cols-[1fr_2fr_1fr] grid-rows-2 gap-2'>
				<Button
					disabled={datasetSize <= 0}
					onClick={() => setDatasetSize(datasetSize - 5)}
				>
					5<sup>-</sup>
				</Button>
				<Button
					disabled={datasetSize <= 0}
					onClick={() => setDatasetSize(datasetSize - 1)}
				>
					1<sup>-</sup>
				</Button>
				<figure className='row-span-2 flex flex-col items-center justify-center rounded-lg p-4 text-center text-gray-800 dark:text-gray-300'>
					<span className='text-5xl font-black'>{datasetSize}</span>
					<figcaption className='text-md text-2xl font-bold'>Bars</figcaption>
				</figure>
				<Button
					disabled={datasetSize >= maxBarCount}
					onClick={() => setDatasetSize(datasetSize + 5)}
				>
					5<sup>+</sup>
				</Button>
				<Button
					disabled={datasetSize >= maxBarCount}
					onClick={() => setDatasetSize(datasetSize + 1)}
				>
					1<sup>+</sup>
				</Button>
			</div>
			<hr />
			<div className='flex flex-col gap-2'>
				<Button onClick={createNewDataset}>Create New Dataset</Button>
			</div>
		</div>
	)
}
