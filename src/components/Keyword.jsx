import { EditableInput, EditablePreview, EditableRoot, TagLabel, TagRoot } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'

export const Keyword = ({ index }) => {
	const [keywords, { editKeyword }] = useKeywords()
	return (
		<TagRoot size="xl">
			<TagLabel>
				<EditableRoot
					value={keywords[index]}
					onValueChange={e => editKeyword(index, e.value)}
				>
					<EditablePreview></EditablePreview>
					<EditableInput></EditableInput>
				</EditableRoot>
			</TagLabel>
		</TagRoot>
	)
}
