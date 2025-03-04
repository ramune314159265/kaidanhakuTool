import { atom, useAtom } from 'jotai'

export const replacementsAtom = atom([
	{ from: 'aaa', to: 'bbb' },
	{ from: 'ccc', to: 'ddd' }
])

export const useReplacements = () => {
	const [replacements, setReplacements] = useAtom(replacementsAtom)

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
