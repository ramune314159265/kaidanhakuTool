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
import { Box, defineStyle, FieldLabel, FieldRoot, HStack, Input } from '@chakra-ui/react'
import { usePlayers } from '../atoms/Players'
import { jobsCollection } from '../utils/jobs'

export const Player = ({ uuid }) => {
	const [players, { editPlayer }] = usePlayers()
	return (
		<HStack w="full">
			<FieldRoot w="100%">
				<Box pos="relative" w="full">
					<Input
						w="full"
						className="peer"
						placeholder=""
						size="xs"
						value={players[uuid].name}
						onChange={e => editPlayer(uuid, { name: e.target.value })}
					></Input>
					<FieldLabel css={floatingStyles} >名前</FieldLabel>
				</Box>
			</FieldRoot>

			<SelectRoot
				size="xs"
				w="10rem"
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

			<FieldRoot w="5rem">
				<Box>
					<NumberInputRoot
						size="xs"
						min={0}
						allowMouseWheel
						className="peer"
						value={players[uuid].hp}
						onValueChange={e => editPlayer(uuid, { hp: e.value })}
					>
						<NumberInputField></NumberInputField>
					</NumberInputRoot>
					<FieldLabel css={floatingStyles} >HP</FieldLabel>
				</Box>
			</FieldRoot>

			<FieldRoot w="5rem">
				<Box>
					<NumberInputRoot
						size="xs"
						min={1}
						max={6}
						allowOverflow={false}
						className="peer"
						value={players[uuid].rollValue}
						onValueChange={e => editPlayer(uuid, { rollValue: e.value })}
					>
						<NumberInputField></NumberInputField>
					</NumberInputRoot>
					<FieldLabel css={floatingStyles} >数字</FieldLabel>
				</Box>
			</FieldRoot>
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
