import { Grid, Separator, Text, VStack } from '@chakra-ui/react'
import { useReplacements } from '../atoms/replacements'
import { Replacement } from './Replacement'

export const ReplacementList = () => {
	const [replacements] = useReplacements()
	return (
		<VStack>
			<Grid w="full" gap="2" templateColumns="1fr 1fr">
				<Text fontSize="xs">前</Text>
				<Text fontSize="xs">後</Text>
			</Grid>
			<Separator w="full" />
			{
				replacements.map((replacement, index) => (
					<Replacement index={index} key={index}></Replacement>
				))
			}
		</VStack>
	)
}
