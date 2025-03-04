import { Grid, Separator, Text, VStack } from '@chakra-ui/react'
import { usePlayers } from '../atoms/players'
import { Player } from './Player'
import { PlayerAdd } from './PlayerAdd'

export const PlayerList = () => {
	const [players] = usePlayers()
	return (
		<VStack>
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
	)
}
