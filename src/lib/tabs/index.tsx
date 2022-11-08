import * as Tabs from '@radix-ui/react-tabs'
import DatasetTab from './dataset.tab'
import AlgorithmTab from './algorithm.tab'
import SettingsTab from './settings.tab'

type Props = {}

const TabsTrigger = (props: Tabs.TabsTriggerProps) => (
	<Tabs.Trigger
		{...props}
		className={`flex-grow bg-gray-100 p-4 font-bold text-gray-500 radix-state-active:bg-primary-400/30 radix-state-active:text-primary-700 dark:bg-gray-900 dark:text-gray-300 dark:radix-state-active:bg-primary-900/30 dark:radix-state-active:text-primary-200 ${props.className}`}
	/>
)
const TabsContent = (props: Tabs.TabsContentProps) => (
	<Tabs.Content {...props} className={`p-4 ${props.className}`} />
)

const tabs = [
	{
		name: 'algorithm',
		title: 'Algorithm',
		Component: AlgorithmTab,
	},
	{
		name: 'dataset',
		title: 'Dataset',
		Component: DatasetTab,
	},
	{
		name: 'settings',
		title: 'Settings',
		Component: SettingsTab,
	},
]

export default function AppTabs({}: Props) {
	return (
		<Tabs.Root
			defaultValue={tabs[0].name}
			className='overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-900'
		>
			<Tabs.List className='flex overflow-x-auto border-b-2 border-primary-600/70 dark:border-primary-800'>
				{tabs.map(({ name, title }) => (
					<TabsTrigger key={name} value={name}>
						{title}
					</TabsTrigger>
				))}
			</Tabs.List>
			{tabs.map(({ name, Component }) => (
				<TabsContent
					key={name}
					value={name}
					className='bg-gray-100 dark:bg-gray-900'
				>
					<Component />
				</TabsContent>
			))}
		</Tabs.Root>
	)
}
