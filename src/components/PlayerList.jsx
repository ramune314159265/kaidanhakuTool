import { VStack } from '@chakra-ui/react'
import { usePlayers } from '../atoms/Players'
import { Player } from './Player'

export const PlayerList = () => {
	const [ players ] = usePlayers()
	return (
		<VStack>
			{
				Object.values(players).map(p => (
					<Player key={p.uuid} uuid={p.uuid}></Player>
				))
			}
		</VStack>
	)
}
