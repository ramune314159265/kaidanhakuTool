import { EditableInput, EditablePreview, EditableRoot, TagLabel, TagRoot } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'

export const Keyword = ({ index }) => {
	const [keywords, { editKeyword, deleteKeyword }] = useKeywords()
	const onSubmit = value => {
		if (!value) {
			deleteKeyword(index)
			return
		}
		editKeyword(index, value)
	}

	return (
		<TagRoot size="xl">
			<TagLabel>
				<EditableRoot
					defaultValue={keywords[index]}
					onValueCommit={(e) => onSubmit(e.value)}
				>
					<EditablePreview></EditablePreview>
					<EditableInput></EditableInput>
				</EditableRoot>
			</TagLabel>
		</TagRoot>
	)
}
