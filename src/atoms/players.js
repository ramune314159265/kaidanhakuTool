import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { jobs } from '../utils/jobs'

export const playersAtom = atom(localStorage.getItem('ramune314159265.kaidanhakuTool.players') === null ?
	[] :
	JSON.parse(localStorage.getItem('ramune314159265.kaidanhakuTool.players'))
)

export const usePlayers = () => {
	const [players, setPlayers] = useAtom(playersAtom)

	useEffect(() => {
		localStorage.setItem('ramune314159265.kaidanhakuTool.players', JSON.stringify(players))
	}, [players])

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
