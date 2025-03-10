import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const keywordsAtom = atom(localStorage.getItem('ramune314159265.kaidanhakuTool.keywords') === null ?
	[] :
	JSON.parse(localStorage.getItem('ramune314159265.kaidanhakuTool.keywords'))
)

export const useKeywords = () => {
	const [keywords, setKeywords] = useAtom(keywordsAtom)

	useEffect(() => {
		localStorage.setItem('ramune314159265.kaidanhakuTool.keywords', JSON.stringify(keywords))
	}, [keywords])

	const addKeyword = ({ word }) => {
		setKeywords([
			...keywords,
			word
		])
	}

	const editKeyword = (index, override) => {
		const copy = [...keywords]
		copy[index] = override
		setKeywords(copy)
	}

	const deleteKeyword = (index) => {
		const copy = [...keywords]
		copy.splice(index)
		setKeywords(copy)
	}

	return [keywords, { setKeywords, addKeyword, editKeyword, deleteKeyword }]
}
