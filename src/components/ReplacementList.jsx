import { Button, Grid, Separator, Text, VStack } from '@chakra-ui/react'
import { HiMiniPlus } from 'react-icons/hi2'
import { useReplacements } from '../atoms/replacements'
import { Replacement } from './Replacement'
import { ReplacementAddDialog } from './ReplacementAddDialog'

export const ReplacementList = () => {
	const [replacements] = useReplacements()
	return (
		<VStack>
			<Grid w="full" gap="2" templateColumns="1fr 2fr 2fr">
				<Text fontSize="xs">プレイヤー名</Text>
				<Text fontSize="xs">前</Text>
				<Text fontSize="xs">後</Text>
			</Grid>
			<Separator w="full" />
			{
				replacements.map((replacement, index) => (
					<Replacement index={index} key={index}></Replacement>
				))
			}
			<Separator w="full" />
			<ReplacementAddDialog>
				<Button size="xs" w="full"><HiMiniPlus /> 置き換えを追加</Button>
			</ReplacementAddDialog>
		</VStack>
	)
}
