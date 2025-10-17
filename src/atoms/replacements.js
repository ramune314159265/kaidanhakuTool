import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const replacementsAtom = atom(localStorage.getItem('ramune314159265.kaidanhakuTool.replacements') === null ?
	[] :
	JSON.parse(localStorage.getItem('ramune314159265.kaidanhakuTool.replacements'))
)

export const useReplacements = () => {
	const [replacements, setReplacements] = useAtom(replacementsAtom)

	useEffect(() => {
		localStorage.setItem('ramune314159265.kaidanhakuTool.replacements', JSON.stringify(replacements))
	}, [replacements])

	const addReplacement = ({ from, to, playerId }) => {
		setReplacements([
			...replacements,
			{ from, to, playerId }
		])
	}

	const deleteKeyword = (index) => {
		const copy = [...replacements]
		copy.splice(index)
		setReplacements(copy)
	}

	const editReplacement = (index, overrides) => {
		const data = {
			...replacements[index],
			...overrides
		}
		if (!data.from || !data.to) {
			deleteKeyword(index)
			return
		}
		const copy = [...replacements]
		copy[index] = data
		setReplacements(copy)
	}
	return [replacements, { setReplacements, addReplacement, editReplacement }]
}
