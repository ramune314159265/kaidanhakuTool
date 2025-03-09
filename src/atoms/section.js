import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'

const sectionAtom = atom(localStorage.getItem('ramune314159265.kaidanhakuTool.section') === null ?
	0 :
	JSON.parse(localStorage.getItem('ramune314159265.kaidanhakuTool.section'))
)

export const useSection = () => {
	const [section, setSection] = useAtom(sectionAtom)

	useEffect(() => {
		localStorage.setItem('ramune314159265.kaidanhakuTool.section', JSON.stringify(section))
	}, [section])

	return [section, { setSection }]
}
