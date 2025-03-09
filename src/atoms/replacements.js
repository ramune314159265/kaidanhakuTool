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

	const addReplacement = ({ from, to }) => {
		setReplacements([
			...replacements,
			{ from, to }
		])
	}

	const editReplacement = (index, overrides) => {
		const copy = [...replacements]
		copy[index] = {
			...replacements[index],
			...overrides
		}
		setReplacements(copy)
	}
	return [replacements, { setReplacements, addReplacement, editReplacement }]
}
