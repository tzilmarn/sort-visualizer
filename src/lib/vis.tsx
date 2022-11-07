import { motion } from 'framer-motion'

export interface Props {
	boxes: Array<{ id: string; value: number }>
}

export default function Vis({ boxes }: Props) {
	return (
		<motion.div className='flex h-full gap-1 overflow-x-auto' layout>
			{boxes.map(({ value, id }) => (
				<motion.div
					key={id}
					layoutId={id}
					initial={{ scaleY: 0 }}
					animate={{ scaleY: Math.max(0.01, value) }}
					style={{ originY: 1 }}
					className='h-full w-full origin-bottom rounded-sm bg-indigo-500 [min-width:4px]'
					whileHover={{ y: -8 }}
					whileDrag={{ y: 0 }}
					dragConstraints={{ bottom: 0 }}
				/>
			))}
		</motion.div>
	)
}
