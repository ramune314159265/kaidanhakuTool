import { Tooltip } from "@/components/ui/tooltip"
import { Box, Text } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'
import { useReplacements } from '../atoms/replacements'
import { useOriginalSentence } from '../atoms/sentence'
import { splitByKeywords } from '../utils/split'

export const ReplacedSentence = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const [keywords] = useKeywords()
	const replacementsFrom = replacements.map(e => e.from)
	const splitted = splitByKeywords(originalSentence, [...replacementsFrom, ...keywords])
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
				splitted.map((i, index) => {
					switch (true) {
						case replacementsFrom.includes(i): {
							const to = replacements.find(e => e.from === i).to
							return (
								<Tooltip key={index} content={`${i} → ${to}`} showArrow openDelay="0" closeDelay="0">
									<Text
										as="span"
										color="green.500"
									>
										{to}
									</Text>
								</Tooltip>
							)
						}
						case keywords.includes(i): {
							return (
								<Tooltip key={index} content={`キーワード: ${i}`} showArrow openDelay="0" closeDelay="0">
									<Text
										as="span"
										color="yellow.500"
									>
										{i}
									</Text>
								</Tooltip>
							)
						}
						default: {
							return i
						}
					}
				})
			}
		</Box>
	)
}
