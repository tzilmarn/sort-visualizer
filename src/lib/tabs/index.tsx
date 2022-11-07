import * as Tabs from '@radix-ui/react-tabs'
import DatasetTab from './dataset.tab'
import AlgorithmTab from './algorithm.tab'

type Props = {}

const TabsTrigger = (props: Tabs.TabsTriggerProps) => (
	<Tabs.Trigger
		{...props}
		className={`flex-grow p-4 first:rounded-t-lg radix-state-active:bg-indigo-900/30 radix-state-active:font-bold radix-state-active:text-indigo-200 ${props.className}`}
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
]

export default function AppTabs({}: Props) {
	return (
		<Tabs.Root defaultValue={tabs[0].name} className='rounded-lg bg-gray-900'>
			<Tabs.List className='flex overflow-x-auto border-b-2 border-indigo-800'>
				{tabs.map(({ name, title }) => (
					<TabsTrigger key={name} value={name}>
						{title}
					</TabsTrigger>
				))}
			</Tabs.List>
			{tabs.map(({ name, Component }) => (
				<TabsContent key={name} value={name}>
					<Component />
				</TabsContent>
			))}
		</Tabs.Root>
	)
}
