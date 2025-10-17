import { HStack, Theme } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'
import { Keyword } from './Keyword'
import { KeywordAdd } from './KeywordAdd'

export const KeywordListPanel = () => {
	const [keywords] = useKeywords()
	return (
		<Theme appearance="dark" h="full">
			<HStack flexWrap="wrap" alignContent="flex-start" p={2} overflowY="auto" h="full">
				{
					keywords.map((keyword, index) => (
						<Keyword key={keyword + index} index={index}></Keyword>
					))
				}
				<KeywordAdd></KeywordAdd>
			</HStack>
		</Theme>
	)
}
