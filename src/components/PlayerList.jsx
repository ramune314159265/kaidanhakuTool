import { Separator, VStack } from '@chakra-ui/react'
import { usePlayers } from '../atoms/players'
import { Player } from './Player'
import { PlayerAdd } from './PlayerAdd'

export const PlayerList = () => {
	const [players] = usePlayers()
	return (
		<VStack>
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
