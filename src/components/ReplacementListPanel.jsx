import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard"
import { Button, Float, Grid, Separator, Text, Theme, VStack } from '@chakra-ui/react'
import { HiMiniPlus } from 'react-icons/hi2'
import { usePlayers } from '../atoms/players'
import { useReplacements } from '../atoms/replacements'
import { Replacement } from './Replacement'
import { ReplacementAddDialog } from './ReplacementAddDialog'

export const ReplacementListPanel = () => {
	const [players] = usePlayers()
	const [replacements] = useReplacements()
	return (
		<Theme appearance="dark" h="full">
			<VStack position="relative" p={2} overflowY="auto" h="full">
				<Float offset="4">
					<ClipboardRoot value={replacements.map(r => `${players[r.playerId].name} ${r.from} → ${r.to}`).join('\n')}>
						<ClipboardIconButton />
					</ClipboardRoot>
				</Float>
				<Grid w="full" gap="2" templateColumns="1fr 2fr 2fr">
					<Text fontSize="xs">プレイヤー名</Text>
					<Text fontSize="xs">前</Text>
					<Text fontSize="xs">後</Text>
				</Grid>
				<Separator w="full" />
				{
					replacements.map((data, index) => (
						<Replacement index={index} key={(data.from ?? '') + (data.to ?? '') + index}></Replacement>
					))
				}
				<Separator w="full" />
				<ReplacementAddDialog>
					<Button size="xs" w="full"><HiMiniPlus /> 置き換えを追加</Button>
				</ReplacementAddDialog>
			</VStack>
		</Theme>
	)
}
