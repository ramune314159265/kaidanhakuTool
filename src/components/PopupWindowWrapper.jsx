import { Theme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { useEffect, useState } from 'react'

export const PopupWindowWrapper = ({ children }) => {
	const [elementWindow, setElementWindow] = useState(window)
	const cache = createCache({ key: 'css', container: elementWindow.document.head })
	useEffect(() => {
		if (elementWindow === window) {
			return
		}
		if (elementWindow.document.documentElement.dataset.styled) {
			return
		}
		const styles = [...document.querySelectorAll('style[data-emotion]')].toReversed()
		const newStyle = elementWindow.document.createElement('style')
		elementWindow.document.head.appendChild(newStyle)
		styles.forEach(s => {
			const rules = [...s.sheet.cssRules].toReversed()
			for (const cssRule of rules) {
				if (cssRule instanceof CSSLayerStatementRule) {
					continue
				}
				newStyle.sheet.insertRule(cssRule.cssText)
			}
		})
		elementWindow.document.documentElement.dataset.styled = true
	}, [elementWindow])

	return (
		<>
			<Theme appearance="dark" h="full">
				<span style={{ display: 'none' }} ref={(e) => {
					if (e?.ownerDocument) setElementWindow(e.ownerDocument.defaultView)
				}}></span>
				{elementWindow === window ?
					children :
					<CacheProvider value={cache}>
						{children}
					</CacheProvider>
				}
			</Theme >
		</>
	)
}
