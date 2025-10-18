import { Textarea } from '@chakra-ui/react'
import { useOriginalSentence } from '../atoms/sentence'
import { PopupWindowWrapper } from './PopupWindowWrapper'

export const OriginalSentencePanel = () => {
	const [originalSentence, { setOriginalSentence }] = useOriginalSentence()
	return (
		<PopupWindowWrapper>
			<Textarea
				placeholder={`これは私の知人から聞いた話です。数年前のある日...`}
				defaultValue={originalSentence}
				onChange={e => setOriginalSentence(e.target.value)}
				resize="none"
				h="full"
				fontSize="md"
				lineHeight="tall"
			/>
		</PopupWindowWrapper>
	)
}
