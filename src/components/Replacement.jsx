import { Grid, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'

export const Replacement = ({ index }) => {
	const [replacements, { editReplacement }] = useReplacements()
	const [players] = usePlayers()
	const [from, setFrom] = useState(replacements[index].from)
	const [to, setTo] = useState(replacements[index].to)
	const onSubmit = () => {
		editReplacement(index, { from, to })
	}

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
				value={from}
				onChange={e => setFrom(e.target.value)}
				onKeyDown={e => {
					if (e.key === 'Enter') onSubmit()
				}}
				onBlur={onSubmit}
			></Input>
			<Input
				w="full"
				aria-label="後"
				placeholder=""
				size="xs"
				variant="subtle"
				value={to}
				onChange={e => setTo(e.target.value)}
				onKeyDown={e => {
					if (e.key === 'Enter') onSubmit()
				}}
				onBlur={onSubmit}
			></Input>
		</Grid>
	)
}
