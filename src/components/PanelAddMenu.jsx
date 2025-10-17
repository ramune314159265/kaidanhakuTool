import { Actions, DockLocation } from 'flexlayout-react'
import { Item, Menu, useContextMenu } from 'react-contexify'
import { RxPlus } from 'react-icons/rx'

export const PanelAddMenu = ({ id, model }) => {
	const { show } = useContextMenu({ id: 'add' + id })
	const components = [
		{ id: 'playerList', name: 'プレイヤー一覧' },
		{ id: 'replacementList', name: '置き換え一覧' },
		{ id: 'originalSentence', name: '元の文章' },
		{ id: 'replacedSentence', name: '置き換え後の文章' },
		{ id: 'keywordList', name: 'キーワード一覧' },
	]

	return (
		<>
			<button
				key="add"
				className='flexlayout__tab_toolbar_button'
				onClick={e => {
					show({ event: e })
					e.stopPropagation()
				}}
			>
				<RxPlus fill='var(--color-icon)'></RxPlus>
			</button>
			<Menu id={'add' + id} theme="dark">
				{
					components.map(e => {
						return <Item
							id={e.id}
							onClick={() => {
								model.doAction(Actions.addNode({
									component: e.id,
									name: e.name
								}, id, DockLocation.CENTER, -1, true))
							}}
							key={e.id}
						> {e.name}</Item>
					})
				}
			</Menu >
		</>
	)
}
