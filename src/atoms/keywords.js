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

	return [keywords, { setKeywords, addKeyword }]
}
