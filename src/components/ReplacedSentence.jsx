import { Tooltip } from "@/components/ui/tooltip"
import { Box, Text } from '@chakra-ui/react'
import { useReplacements } from '../atoms/replacements'
import { useOriginalSentence } from '../atoms/sentence'
import { splitByKeywords } from '../utils/split'

export const ReplacedSentence = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const replacementsFrom = replacements.map(e => e.from)
	const splitted = splitByKeywords(originalSentence, replacementsFrom)
	return (
		<Box
			paddingInline="3"
			paddingBlock="2"
			h="full"
			fontSize="md"
			borderWidth="1px"
			borderColor="border"
			borderRadius="sm"
			lineHeight="1.75"
		>
			{
				splitted.map(i => {
					switch (true) {
						case replacementsFrom.includes(i): {
							const to = replacements.find(e => e.from === i).to
							return (
								<Tooltip content={`${i} → ${to}`} showArrow openDelay="0" closeDelay="0">
									<Text
										as="span"
										key={Math.random()}
										color="green.500"
									>
										{to}
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
