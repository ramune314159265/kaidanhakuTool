import { EditableInput, EditablePreview, EditableRoot, TagLabel, TagRoot } from '@chakra-ui/react'
import { useState } from 'react'
import { useKeywords } from '../atoms/keywords'

export const Keyword = ({ index }) => {
	const [keywords, { editKeyword, deleteKeyword }] = useKeywords()
	const [keyword, setKeyword] = useState(keywords[index])
	const onSubmit = () => {
		console.log(keyword)
		if (!keyword) {
			deleteKeyword(index)
			return
		}
		editKeyword(index, keyword)
	}
	return (
		<TagRoot size="xl">
			<TagLabel>
				<EditableRoot
					value={keyword}
					onValueChange={e => setKeyword(e.value)}
					onKeyDown={e => {
						if (e.key === 'Enter') onSubmit()
					}}
				>
					<EditablePreview></EditablePreview>
					<EditableInput></EditableInput>
				</EditableRoot>
			</TagLabel>
		</TagRoot>
	)
}
