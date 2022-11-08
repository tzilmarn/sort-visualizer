import { motion } from 'framer-motion'
import { useContext } from 'react'
import SimulationControlContext from './simulation.context'

export interface Props {
	boxes: Array<{ id: string; value: number }>
}

export default function Vis({ boxes }: Props) {
	const { algState } = useContext(SimulationControlContext)

	return (
		<motion.div className='flex h-full gap-1 overflow-x-auto' layout>
			{boxes.map(({ value, id }) => (
				<motion.div
					key={id}
					layoutId={id}
					initial={{ scaleY: 0 }}
					animate={{
						scaleY: Math.max(0.01, value),
						backgroundColor: algState?.highlight?.includes(id)
							? '#ff0000'
							: undefined,
					}}
					style={{ originY: 1 }}
					className='h-full w-full origin-bottom rounded-sm bg-primary-500 [min-width:4px]'
				/>
			))}
		</motion.div>
	)
}
