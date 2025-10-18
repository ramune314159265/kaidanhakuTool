import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard"
import {
	PaginationNextTrigger,
	PaginationPageText,
	PaginationPrevTrigger,
	PaginationRoot
} from "@/components/ui/pagination"
import { Tooltip } from "@/components/ui/tooltip"
import { Box, HStack, SimpleGrid, SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchRoot, SwitchThumb, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { HiArrowRight } from 'react-icons/hi2'
import { useKeywords } from '../atoms/keywords'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'
import { useSection } from '../atoms/section'
import { useOriginalSentence } from '../atoms/sentence'
import { parseSentence } from '../utils/parser'
import { PopupWindowWrapper } from './PopupWindowWrapper'

export const ReplacedSentenceGMPanel = () => {
	const [originalSentence] = useOriginalSentence()
	const [replacements] = useReplacements()
	const [keywords] = useKeywords()
	const [players] = usePlayers()
	const [section, { setSection }] = useSection()

	const [isShowFull, setIsShowFull] = useState(false)
	const sentenceSplitted = originalSentence.split(/\n{2,}/)
	const sectionRegulated = Math.min(section, sentenceSplitted.length)
	const sentenceToShow = isShowFull ? originalSentence : sentenceSplitted[sectionRegulated]

	const sentenceParsed = parseSentence(sentenceToShow, { replacements, keywords })
	return (
		<PopupWindowWrapper>
			<SimpleGrid templateRows="1fr 44px" h="full" position="relative">
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
				<HStack w="full" justifyContent="center" gap="4">
					<PaginationRoot
						variant="solid"
						count={sentenceSplitted.length}
						pageSize={1}
						page={sectionRegulated + 1}
						onPageChange={e => setSection(e.page - 1)}
					>
						<HStack>
							<PaginationPrevTrigger disabled={isShowFull} />
							<PaginationPageText format="short" />
							<PaginationNextTrigger disabled={isShowFull} />
						</HStack>
					</PaginationRoot>
					<ClipboardRoot value={sentenceParsed.map(i => i.content).join('')}>
						<ClipboardIconButton size="sm" />
					</ClipboardRoot>
					<SwitchRoot checked={isShowFull} onCheckedChange={e => setIsShowFull(e.checked)}>
						<SwitchHiddenInput></SwitchHiddenInput>
						<SwitchControl>
							<SwitchThumb></SwitchThumb>
						</SwitchControl>
						<SwitchLabel>全文</SwitchLabel>
					</SwitchRoot>
				</HStack>
			</SimpleGrid>
		</PopupWindowWrapper>
	)
}
