import { atom, useAtom } from 'jotai'
import { jobs } from '../utils/jobs'

export const playersAtom = atom({
	'test': {
		uuid: 'test',
		name: 'ああああああ',
		jobId: 'playwright',
		rollValue: 1,
		hp: 1
	},
	'test2': {
		uuid: 'test2',
		name: 'いいいいいいいいい',
		jobId: 'editor',
		rollValue: 2,
		hp: 4
	}
})

export const usePlayers = () => {
	const [players, setPlayers] = useAtom(playersAtom)

	const addPlayer = ({ uuid, name, jobId, rollValue }) => {
		setPlayers({
			...players,
			[uuid]: {
				uuid,
				name,
				jobId,
				rollValue,
				hp: jobs[jobId].hp
			},
		})
	}

	const editPlayer = (uuid, overrides) => {
		setPlayers({
			...players,
			[uuid]: {
				...players[uuid],
				...overrides
			}
		})
	}

	return [players, { setPlayers, addPlayer, editPlayer }]
}
