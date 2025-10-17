import { Grid, Input, Text } from '@chakra-ui/react'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'

export const Replacement = ({ index }) => {
	const [replacements, { editReplacement }] = useReplacements()
	const [players] = usePlayers()
	return (
		<Grid w="full" gap="2" templateColumns="1fr 2fr 2fr" alignItems="center">
			<Text
				fontSize="sm"
				truncate
				verticalAlign="middle"
			>{players[replacements[index].playerId].name}</Text>
			<Input
				w="full"
				aria-label="前"
				placeholder=""
				size="xs"
				variant="subtle"
				value={replacements[index].from}
				onChange={e => editReplacement(index, { from: e.target.value })}
			></Input>
			<Input
				w="full"
				aria-label="後"
				placeholder=""
				size="xs"
				variant="subtle"
				value={replacements[index].to}
				onChange={e => editReplacement(index, { to: e.target.value })}
			></Input>
		</Grid>
	)
}
