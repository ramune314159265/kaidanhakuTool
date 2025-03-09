import { Tooltip } from "@/components/ui/tooltip"
import { Box, HStack, Text } from '@chakra-ui/react'
import { HiArrowRight } from 'react-icons/hi2'
import { useKeywords } from '../atoms/keywords'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'
import { useOriginalSentence } from '../atoms/sentence'
import { parseSentence } from '../utils/parser'

export const ReplacedSentence = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const [keywords] = useKeywords()
	const [players] = usePlayers()
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
			lineHeight="tall"
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
								i.data.map((i, index) => {
									switch (i.type) {
										case 'replacement':
											return (
												<HStack key={index} gap="1">
													<Text>{players[i.playerId].name}: </Text>
													<Text>{i.from}</Text>
													<HiArrowRight></HiArrowRight>
													<Text>{i.to}</Text>
												</HStack>
											)
										case 'keyword':
											return <Text key={index}>{`キーワード: ${i.keyword}`}</Text>
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
								color={i.data.map(i => i.type).includes('replacement') ? 'green.500' : null}
								bg={i.data.map(i => i.type).includes('keyword') ? 'yellow.emphasized' : null}
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
