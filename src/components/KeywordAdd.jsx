import { Input, TagEndElement, TagLabel, TagRoot } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useKeywords } from '../atoms/keywords'

export const KeywordAdd = () => {
	const [keywords, { addKeyword }] = useKeywords()
	const [keyword, setKeyword] = useState('')
	const onSubmit = () => {
		if (!keyword) {
			return
		}
		addKeyword({ word: keyword })
		setKeyword('')
	}
	return (
		<TagRoot size="xl" variant="solid" w="32">
			<TagLabel w="full">
				<Input
					size="sm"
					border="none"
					p="0"
					placeholder="キーワード追加"
					onChange={e => setKeyword(e.target.value)}
					value={keyword}
					onKeyDown={e => {
						if (e.key === 'Enter') onSubmit()
					}}
				></Input>
			</TagLabel>
			<TagEndElement onClick={() => onSubmit()}>
				<HiMiniPlus></HiMiniPlus>
			</TagEndElement>
		</TagRoot>
	)
}
