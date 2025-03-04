import { Box, defineStyle, FieldLabel, FieldRoot, HStack, Input } from '@chakra-ui/react'
import { useReplacements } from '../atoms/replacements'

export const Replacement = ({ index }) => {
	const [replacements, { editReplacement }] = useReplacements()
	console.log(replacements)
	return (
		<HStack w="full">
			<FieldRoot w="50%">
				<Box pos="relative" w="full">
					<Input
						w="full"
						className="peer"
						placeholder=""
						size="xs"
						value={replacements[index].from}
						onChange={e => editReplacement(index, { from: e.target.value })}
					></Input>
					<FieldLabel css={floatingStyles} >前</FieldLabel>
				</Box>
			</FieldRoot>
			<FieldRoot w="50%">
				<Box pos="relative" w="full">
					<Input
						w="full"
						className="peer"
						placeholder=""
						size="xs"
						value={replacements[index].to}
						onChange={e => editReplacement(index, { to: e.target.value })}
					></Input>
					<FieldLabel css={floatingStyles} >後</FieldLabel>
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
