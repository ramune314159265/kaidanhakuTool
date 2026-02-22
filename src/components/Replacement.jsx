import { CheckboxControl, CheckboxHiddenInput, CheckboxRoot, Grid, Input, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'

export const Replacement = ({ index }) => {
	const [replacements, { editReplacement }] = useReplacements()
	const [players] = usePlayers()
	const data = replacements[index]
	const [from, setFrom] = useState(data.from)
	const [to, setTo] = useState(data.to)
	const onSubmit = () => {
		editReplacement(index, { from, to })
	}

	return (
		<Grid w="full" gap="2" templateColumns="24px 1fr 2fr 2fr" alignItems="center">
			<CheckboxRoot checked={data.enabled} onCheckedChange={e => editReplacement(index, { enabled: e.checked })}>
				<CheckboxHiddenInput></CheckboxHiddenInput>
				<CheckboxControl></CheckboxControl>
			</CheckboxRoot>
			<Text
				fontSize="sm"
				truncate
				verticalAlign="middle"
				color={data.enabled ? null : 'fg.muted'}
			>{players[data.playerId].name}</Text>
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
