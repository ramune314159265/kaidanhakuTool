import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { useReplacements } from '../atoms/replacements'
import { useSection } from '../atoms/section'
import { useOriginalSentence } from '../atoms/sentence'
import { parseSentence } from '../utils/parser'
import { PopupWindowWrapper } from './PopupWindowWrapper'

export const ReplacedSentencePlayerPanel = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const [section] = useSection()

	const [isShowFull] = useState(false)
	const sentenceSplitted = originalSentence.split(/\n{2,}/)
	const sectionRegulated = Math.min(section, sentenceSplitted.length)
	const sentenceToShow = isShowFull ? originalSentence : sentenceSplitted[sectionRegulated]

	const sentenceParsed = parseSentence(sentenceToShow, { replacements, keywords: [] })
	return (
		<PopupWindowWrapper>
			<Box
				paddingInline="3"
				paddingBlock="2"
				h="full"
				fontSize="md"
				overflowY="auto"
				borderWidth="1px"
				borderColor="border"
				borderRadius="sm"
				lineHeight="tall"
				whiteSpace="pre-line"
				position="relative"
			>
				{
					sentenceParsed.map((i, index) => {
						if (i.data.length === 0) {
							return i.content
						}
						return (
							<Text
								as="span"
								color={i.data.map(i => i.type).includes('replacement') ? 'green.500' : null}
								key={index}
							>
								{i.content}
							</Text>
						)
					})
				}
				<Text
					position="absolute"
					right={0}
					bottom={0}
					padding={1}
					userSelect="none"
					bg="bg.panel"
				>{`${sectionRegulated + 1} / ${sentenceSplitted.length}`}</Text>
			</Box>
		</PopupWindowWrapper>
	)
}
