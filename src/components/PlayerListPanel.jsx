import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard"
import { Float, Grid, Separator, Text, VStack } from '@chakra-ui/react'
import { usePlayers } from '../atoms/players'
import { jobs } from '../utils/jobs'
import { Player } from './Player'
import { PlayerAdd } from './PlayerAdd'
import { PopupWindowWrapper } from './PopupWindowWrapper'

export const PlayerListPanel = () => {
	const [players] = usePlayers()
	return (
		<PopupWindowWrapper>
			<VStack position="relative" p={2} overflowY="auto" h="full">
				<Float offset="4">
					<ClipboardRoot value={Object.values(players).map(p => `${p.name}（${jobs[p.jobId].name}） HP${p.hp} 数字${p.rollValue}`).join('\n')}>
						<ClipboardIconButton />
					</ClipboardRoot>
				</Float>
				<Grid w="full" gap="2" templateColumns="1fr 6rem 3rem 3rem">
					<Text fontSize="xs">名前</Text>
					<Text fontSize="xs">役職</Text>
					<Text fontSize="xs">数字</Text>
					<Text fontSize="xs">HP</Text>
				</Grid>
				<Separator w="full" />
				{
					Object.values(players).map(p => (
						<Player key={p.uuid} uuid={p.uuid}></Player>
					))
				}
				<Separator w="full" />
				<PlayerAdd></PlayerAdd>
			</VStack>
		</PopupWindowWrapper>
	)
}
