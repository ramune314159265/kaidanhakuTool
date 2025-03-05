import { EditableInput, EditablePreview, EditableRoot, TagEndElement, TagLabel, TagRoot } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useKeywords } from '../atoms/keywords'

export const KeywordAdd = () => {
	const [keywords, { addKeyword }] = useKeywords()
	const [keyword, setKeyword] = useState('')
	return (
		<TagRoot size="xl">
			<TagLabel>
				<EditableRoot
					onValueChange={e => setKeyword(e.value)}
				>
					<EditablePreview></EditablePreview>
					<EditableInput></EditableInput>
				</EditableRoot>
			</TagLabel>
			<TagEndElement onClick={() => addKeyword({ word: keyword })}>
				<HiMiniPlus></HiMiniPlus>
			</TagEndElement>
		</TagRoot>
	)
}
