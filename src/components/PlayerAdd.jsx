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
import { Box, defineStyle, FieldLabel, FieldRoot, HStack, IconButton, Input } from '@chakra-ui/react'
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
		<HStack w="full">
			<FieldRoot w="100%">
				<Box pos="relative" w="full">
					<Input
						w="full"
						className="peer"
						placeholder=""
						size="xs"
						value={name}
						onChange={e => setName(e.target.value)}
					></Input>
					<FieldLabel css={floatingStyles} >名前</FieldLabel>
				</Box>
			</FieldRoot>

			<SelectRoot
				size="xs"
				w="10rem"
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

			<FieldRoot w="5rem">
				<Box>
					<NumberInputRoot
						size="xs"
						min={1}
						max={6}
						allowOverflow={false}
						className="peer"
						value={rollValue}
						onValueChange={e => setRollValue(e.value)}
					>
						<NumberInputField></NumberInputField>
					</NumberInputRoot>
					<FieldLabel css={floatingStyles} >数字</FieldLabel>
				</Box>
			</FieldRoot>

			<IconButton
				size="xs"
				w="43px"
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
		</HStack>
	)
}

const floatingStyles = defineStyle({
	pos: "absolute",
	bg: "bg",
	px: "0.5",
	fontSize: "xs",
	top: "-3",
	insetStart: "2",
	fontWeight: "normal",
	pointerEvents: "none",
	transition: "position",
	_peerPlaceholderShown: {
		color: "fg.muted",
		top: "1.5",
		insetStart: "3",
	},
	_peerFocusVisible: {
		color: "fg",
		top: "-3",
		insetStart: "2",
	},
})
