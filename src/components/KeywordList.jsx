import { HStack } from '@chakra-ui/react'
import { useKeywords } from '../atoms/keywords'
import { Keyword } from './Keyword'

export const KeywordList = () => {
	const [keyword] = useKeywords()
	console.log(keyword)
	return (
		<HStack>
			{
				keyword.map((keyword, index) => (
					<Keyword key={index} index={index}></Keyword>
				))
			}
		</HStack>
	)
}
