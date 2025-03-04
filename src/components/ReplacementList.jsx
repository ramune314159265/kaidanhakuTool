import { VStack } from '@chakra-ui/react'
import { useReplacements } from '../atoms/replacements'
import { Replacement } from './Replacement'

export const ReplacementList = () => {
	const [replacements] = useReplacements()
	return (
		<VStack>
			{
				replacements.map((replacement, index) => (
					<Replacement index={index} key={index}></Replacement>
				))
			}
		</VStack>
	)
}
