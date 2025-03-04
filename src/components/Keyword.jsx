import { TagLabel, TagRoot } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'

export const Keyword = ({ index }) => {
	const [keyword] = useKeywords()
	return (
		<TagRoot size="xl">
			<TagLabel>{keyword[index]}</TagLabel>
		</TagRoot>
	)
}
