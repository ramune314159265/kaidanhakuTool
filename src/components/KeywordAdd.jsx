import { Input, TagEndElement, TagLabel, TagRoot } from '@chakra-ui/react'
import { useState } from 'react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useKeywords } from '../atoms/keywords'

export const KeywordAdd = () => {
	const [keywords, { setKeywords, addKeyword }] = useKeywords()
	const [keyword, setKeyword] = useState('')
	const onSubmit = () => {
		if (!keyword) {
			return
		}
		addKeyword({ word: keyword })
		setKeyword('')
	}
	const onPaste = e => {
		const text = e.clipboardData.getData('text')
		const deleteRegExp = new RegExp('[①-⑳]|[㉑-㊿]|「|」|　|\\*', 'g')
		const splitterRegExp = new RegExp('\\n|、')
		const marksDeleted = text.replace(deleteRegExp, '')
		const splitted = marksDeleted
			.split(splitterRegExp)
			.map(s => s.trim())
			.filter(s => s !== '')
		if (splitted.length <= 1) {
			return
		}
		e.preventDefault()
		setKeywords([
			...keywords,
			...splitted
		])
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
					onPaste={e => onPaste(e)}
				></Input>
			</TagLabel>
			<TagEndElement onClick={() => onSubmit()}>
				<HiMiniPlus></HiMiniPlus>
			</TagEndElement>
		</TagRoot>
	)
}
