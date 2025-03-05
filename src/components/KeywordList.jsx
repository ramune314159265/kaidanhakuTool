import { HStack } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'
import { Keyword } from './Keyword'
import { KeywordAdd } from './KeywordAdd'

export const KeywordList = () => {
	const [keywords] = useKeywords()
	return (
		<HStack flexWrap={true}>
			{
				keywords.map((keyword, index) => (
					<Keyword key={index} index={index}></Keyword>
				))
			}
			<KeywordAdd></KeywordAdd>
		</HStack>
	)
}
