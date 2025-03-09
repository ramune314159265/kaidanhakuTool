import {
	PaginationNextTrigger,
	PaginationPageText,
	PaginationPrevTrigger,
	PaginationRoot
} from "@/components/ui/pagination"
import { Tooltip } from "@/components/ui/tooltip"
import { Box, Center, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { HiArrowRight } from 'react-icons/hi2'
import { useKeywords } from '../atoms/keywords'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'
import { useSection } from '../atoms/section'
import { useOriginalSentence } from '../atoms/sentence'
import { parseSentence } from '../utils/parser'

export const ReplacedSentence = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const [keywords] = useKeywords()
	const [players] = usePlayers()
	const [section, { setSection }] = useSection()

	const sentenceSplitted = originalSentence.split(/\n{2,}/)
	const sectionRegulated = Math.min(section, sentenceSplitted.length)

	const sentenceParsed = parseSentence(sentenceSplitted[sectionRegulated], { replacements, keywords })
	return (
		<SimpleGrid templateRows="1fr 36px" h="full" gap="2">
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
			<PaginationRoot
				w="full"
				variant="solid"
				count={sentenceSplitted.length}
				pageSize={1}
				page={sectionRegulated + 1}
				onPageChange={e => setSection(e.page - 1)}
			>
				<Center>
					<HStack>
						<PaginationPrevTrigger />
						<PaginationPageText format="short" />
						<PaginationNextTrigger />
					</HStack>
				</Center>
			</PaginationRoot>
		</SimpleGrid>
	)
}
