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
import { defineStyle, Grid, Input } from '@chakra-ui/react'
import { usePlayers } from '../atoms/players'
import { jobsCollection } from '../utils/jobs'

export const Player = ({ uuid }) => {
	const [players, { editPlayer }] = usePlayers()
	return (
		<Grid w="full" gap="2" templateColumns="1fr 6rem 3rem 3rem">
			<Input
				w="full"
				aria-label="名前"
				className="peer"
				placeholder=""
				size="xs"
				value={players[uuid].name}
				onChange={e => editPlayer(uuid, { name: e.target.value })}
			></Input>

			<SelectRoot
				size="xs"
				w="full"
				aria-label="役職"
				collection={jobsCollection}
				defaultValue={[players[uuid].jobId]}
				onValueChange={e => editPlayer(uuid, { jobId: e.value[0] })}
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
				value={players[uuid].rollValue}
				onValueChange={e => editPlayer(uuid, { rollValue: e.value })}
			>
				<NumberInputField></NumberInputField>
			</NumberInputRoot>

			<NumberInputRoot
				w="full"
				size="xs"
				aria-label="HP"
				min={0}
				allowMouseWheel
				className="peer"
				value={players[uuid].hp}
				onValueChange={e => editPlayer(uuid, { hp: e.value })}
			>
				<NumberInputField></NumberInputField>
			</NumberInputRoot>
		</Grid>
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
