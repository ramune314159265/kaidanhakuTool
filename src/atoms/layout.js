import { atom, useAtom } from 'jotai'

export const layoutAtom = atom(localStorage.getItem('ramune314159265.kaidanhakuTool.layout') === null ? {
	global: {
		splitterEnableHandle: true,
		tabSetEnableSingleTabStretch: true,
		tabEnablePopout: true
	},
	borders: [],
	layout: {
		type: 'row',
		id: '1',
		children: [
			{
				type: 'row',
				weight: 30,
				children: [
					{
						type: 'tabset',
						weight: 50,
						children: [
							{
								type: 'tab',
								name: 'プレイヤー一覧',
								component: 'playerList'
							}
						]
					},
					{
						type: 'tabset',
						weight: 50,
						children: [
							{
								type: 'tab',
								name: '置き換え一覧',
								component: 'replacementList',
							}
						]
					}
				]
			},
			{
				type: 'row',
				weight: 70,
				children: [
					{
						type: 'tabset',
						weight: 75,
						children: [
							{
								type: 'tab',
								name: '元の文章',
								component: 'originalSentence'
							}, {
								type: 'tab',
								name: '置き換え後の文章(GM)',
								component: 'replacedSentenceGM'
							}, {
								type: 'tab',
								name: '置き換え後の文章(プレイヤー)',
								component: 'replacedSentencePlayer'
							}
						]
					},
					{
						type: 'tabset',
						weight: 25,
						children: [
							{
								type: 'tab',
								name: 'キーワード一覧',
								component: 'keywordList',
							}
						]
					}
				]
			}
		]
	},
	popouts: {}
} : JSON.parse(localStorage.getItem('ramune314159265.kaidanhakuTool.layout')))

export const useLayout = () => {
	const [layout, setLayout] = useAtom(layoutAtom)

	const saveLayout = data => {
		localStorage.setItem('ramune314159265.kaidanhakuTool.layout', JSON.stringify(data))
	}

	return [layout, { setLayout, saveLayout }]
}
