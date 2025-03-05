import { atom, useAtom } from 'jotai'

export const keywordsAtom = atom(['弱虫', '飛び降り'])

export const useKeywords = () => {
	const [keywords, setKeywords] = useAtom(keywordsAtom)

	const addKeyword = ({ word }) => {
		setKeywords([
			...keywords,
			word
		])
	}

	const editKeyword = (index, override) =>{
		const copy = [...keywords]
		copy[index] = override
		setKeywords(copy)
	}

	return [keywords, { setKeywords, addKeyword, editKeyword }]
}
