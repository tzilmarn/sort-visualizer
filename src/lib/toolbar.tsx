import * as Toolbar from '@radix-ui/react-toolbar'
import { useContext } from 'react'
import {
	IoPlay as PlayIcon,
	IoPause as PauseIcon,
	IoPlaySkipForward as StepIcon,
	IoShuffle as ShuffleIcon,
} from 'react-icons/io5'
import SimulationControlContext, {
	allSpeeds,
	Speed,
} from './simulation.context'

export interface Props {
	onStep: () => void
}

const ToolbarButton = (props: Toolbar.ToolbarButtonProps) => (
	<Toolbar.Button
		{...props}
		className={`rounded-lg p-3 text-2xl text-gray-600 hover:bg-primary-500/20 active:bg-primary-500/40 disabled:opacity-30 dark:text-gray-50 ${props.className}`}
	/>
)

export default function Controls({ onStep }: Props) {
	const { speed, setSpeed, isPlaying, toggleIsPlaying, shuffle } = useContext(
		SimulationControlContext
	)

	const handleChangeSpeed = () => {
		const nextSpeed: Speed =
			allSpeeds[
				(allSpeeds.findIndex((s) => s === speed) + 1) % allSpeeds.length
			]
		setSpeed(nextSpeed)
	}

	return (
		<Toolbar.Root className='flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-900'>
			<ToolbarButton
				onClick={toggleIsPlaying}
				className={isPlaying ? 'bg-primary-500/20' : ''}
			>
				{isPlaying ? <PauseIcon /> : <PlayIcon />}
			</ToolbarButton>
			<ToolbarButton disabled={isPlaying} onClick={onStep}>
				<StepIcon />
			</ToolbarButton>
			<Toolbar.Separator className='grow' />
			<ToolbarButton className='text-sm font-bold' onClick={handleChangeSpeed}>
				{speed}x speed
			</ToolbarButton>
			<Toolbar.Separator className='grow' />
			<ToolbarButton onClick={shuffle}>
				<ShuffleIcon />
			</ToolbarButton>
		</Toolbar.Root>
	)
}
