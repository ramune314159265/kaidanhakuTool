import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

export const originalSentenceAtom = atom(localStorage.getItem('ramune314159265.kaidanhakuTool.originalSentence') ?? '')

export const useOriginalSentence = () => {
	const [originalSentence, setOriginalSentence] = useAtom(originalSentenceAtom)
	useEffect(() => {
		localStorage.setItem('ramune314159265.kaidanhakuTool.originalSentence', originalSentence)
	}, [originalSentence])

	return [originalSentence, { setOriginalSentence }]
}
