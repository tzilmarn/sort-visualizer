import { ComponentProps, useContext, useId } from 'react'
import SimulationControlContext from '../simulation.context'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { IoLogoGithub as GithubIcon } from 'react-icons/io5'

const Switch = (props: SwitchPrimitive.SwitchProps) => (
	<SwitchPrimitive.Root
		{...props}
		className={`-500 relative h-[25px] w-[42px] appearance-none rounded-full bg-gray-800  ${props.className}`}
	/>
)
const SwitchThumb = (props: SwitchPrimitive.SwitchThumbProps) => (
	<SwitchPrimitive.Thumb
		{...props}
		className={`block h-[21px] w-[21px] translate-x-[2px] rounded-full bg-gray-500 transition-transform radix-state-checked:translate-x-[19px] radix-state-checked:bg-primary-500 ${props.className}`}
	/>
)

type Props = {}

const Row = (props: ComponentProps<'div'>) => (
	<div
		{...props}
		className={`my-2 flex items-center justify-between ${props.className}`}
	/>
)

export default function SettingsTab({}: Props) {
	const animationToggleId = useId()

	const { isAnimationEnabled, toggleAnimation } = useContext(
		SimulationControlContext
	)

	return (
		<div className='flex flex-col gap-2 divide-y divide-primary-500/30'>
			<Row>
				<div>
					<label htmlFor={animationToggleId}>Enable Animations</label>
				</div>
				<Switch
					id={animationToggleId}
					checked={isAnimationEnabled}
					onCheckedChange={() => toggleAnimation()}
				>
					<SwitchThumb />
				</Switch>
			</Row>
			<a
				href='https://github.com/tzilmarn/sort-visualizer'
				className='text-gray-500 hover:text-primary-400'
			>
				<Row className='flex flex-row items-center justify-start gap-2'>
					<GithubIcon />
					View source code
				</Row>
			</a>
		</div>
	)
}
