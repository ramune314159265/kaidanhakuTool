import {
	NumberInputField,
	NumberInputRoot
} from "@/components/ui/number-input"
import {
	SelectContent,
	SelectItem,
	SelectRoot,
	SelectTrigger,
	SelectValueText
} from "@/components/ui/select"
import { Tooltip } from "@/components/ui/tooltip"
import { Grid, IconButton, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { usePlayers } from '../atoms/players'
import { jobs, jobsCollection } from '../utils/jobs'

export const PlayerAdd = () => {
	const [players, { addPlayer }] = usePlayers()
	const [name, setName] = useState('')
	const [jobId, setJobId] = useState(Object.values(jobs)[0].id)
	const [rollValue, setRollValue] = useState(1)

	return (
		<Grid w="full" gap="2" templateColumns="1fr 6rem 3rem 3rem">
			<Input
				w="full"
				aria-label="名前"
				className="peer"
				placeholder=""
				size="xs"
				value={name}
				onChange={e => setName(e.target.value)}
			></Input>

			<SelectRoot
				size="xs"
				w="full"
				aria-label="役職"
				collection={jobsCollection}
				defaultValue={[jobId]}
				onValueChange={e => setJobId(e.value[0])}
			>
				<SelectTrigger>
					<SelectValueText placeholder="役職を選択"></SelectValueText>
				</SelectTrigger>
				<SelectContent>
					{jobsCollection.items.map(job => (
						<SelectItem item={job} key={job.value}>
							{job.label}
						</SelectItem>
					))}
				</SelectContent>
			</SelectRoot>

			<NumberInputRoot
				w="full"
				size="xs"
				aria-label="数字"
				min={1}
				max={6}
				allowOverflow={false}
				className="peer"
				value={rollValue}
				onValueChange={e => setRollValue(e.value)}
			>
				<NumberInputField></NumberInputField>
			</NumberInputRoot>

			<Tooltip content="プレイヤーを追加" showArrow>
				<IconButton
					size="xs"
					w="full"
					aria-label="プレイヤーを追加"
					onClick={() => {
						addPlayer({
							uuid: crypto.randomUUID(),
							name,
							jobId,
							rollValue
						})
						setName('')
						setRollValue(1)
					}}
				>
					<HiMiniPlus></HiMiniPlus>
				</IconButton>
			</Tooltip>
		</Grid>
	)
}
