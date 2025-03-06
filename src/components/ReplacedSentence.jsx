import { Tooltip } from "@/components/ui/tooltip"
import { Box, Text } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'
import { useReplacements } from '../atoms/replacements'
import { useOriginalSentence } from '../atoms/sentence'
import { parseSentence } from '../utils/parser'

export const ReplacedSentence = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const [keywords] = useKeywords()
	const sentenceParsed = parseSentence(originalSentence, { replacements, keywords })
	return (
		<Box
			paddingInline="3"
			paddingBlock="2"
			h="full"
			fontSize="md"
			overflowY="auto"
			borderWidth="1px"
			borderColor="border"
			borderRadius="sm"
			lineHeight="1.75"
		>
			{
				sentenceParsed.map((i, index) => {
					if (i.data.length === 0) {
						return i.content
					}
					return (
						<Tooltip
							key={index}
							content={
								i.data
									.map(i => {
										switch (i.type) {
											case 'replacement':
												return <Text>{`${i.from} → ${i.to}`}</Text>
											case 'keyword':
												return <Text>{`キーワード: ${i.keyword}`}</Text>
											default:
												return ''
										}
									})
							}
							showArrow
							openDelay="0"
							closeDelay="0"
						>
							<Text
								as="span"
								color={i.data.map(i=>i.type).includes('replacement') ? 'green.500' : null}
								bg={i.data.map(i=>i.type).includes('keyword') ? 'yellow.solid' : null}
							>
								{i.content}
							</Text>
						</Tooltip>
					)
				})
			}
		</Box>
	)
}
