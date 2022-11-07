import * as Toolbar from '@radix-ui/react-toolbar'
import {
	IoPlay as PlayIcon,
	IoPause as PauseIcon,
	IoPlaySkipForward as StepIcon,
	IoShuffle as ShuffleIcon,
	IoRepeat as NewDatasetIcon,
} from 'react-icons/io5'

export interface Props {
	isPlaying: boolean
	onPlayToggle: () => void
	onStep: () => void
	onShuffle: () => void
	onNewDataset: () => void
}

const ToolbarButton = (props: Toolbar.ToolbarButtonProps) => (
	<Toolbar.Button
		{...props}
		className={`rounded-lg p-3 text-2xl hover:bg-primary-500/20 active:bg-primary-500/40 disabled:opacity-30 ${props.className}`}
	/>
)

export default function Controls({
	isPlaying,
	onPlayToggle,
	onStep,
	onShuffle,
	onNewDataset,
}: Props) {
	return (
		<Toolbar.Root className='flex gap-1 rounded-lg bg-gray-300 p-1 dark:bg-gray-900'>
			<ToolbarButton
				onClick={onPlayToggle}
				className={isPlaying ? 'bg-primary-500/20' : ''}
			>
				{isPlaying ? <PauseIcon /> : <PlayIcon />}
			</ToolbarButton>
			<ToolbarButton disabled={isPlaying} onClick={onStep}>
				<StepIcon />
			</ToolbarButton>
			<Toolbar.Separator className='grow' />
			<ToolbarButton onClick={onShuffle}>
				<ShuffleIcon />
			</ToolbarButton>
			<ToolbarButton onClick={onNewDataset}>
				<NewDatasetIcon />
			</ToolbarButton>
		</Toolbar.Root>
	)
}
