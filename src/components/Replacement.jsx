import { Grid, Input } from '@chakra-ui/react'
import { useReplacements } from '../atoms/replacements'

export const Replacement = ({ index }) => {
	const [replacements, { editReplacement }] = useReplacements()
	return (
		<Grid w="full" gap="2" templateColumns="1fr 1fr">
			<Input
				w="full"
				aria-label="前"
				className="peer"
				placeholder=""
				size="xs"
				value={replacements[index].from}
				onChange={e => editReplacement(index, { from: e.target.value })}
			></Input>
			<Input
				w="full"
				aria-label="後"
				className="peer"
				placeholder=""
				size="xs"
				value={replacements[index].to}
				onChange={e => editReplacement(index, { to: e.target.value })}
			></Input>
		</Grid>
	)
}
