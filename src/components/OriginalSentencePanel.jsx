import { Textarea, Theme } from '@chakra-ui/react'
import { useOriginalSentence } from '../atoms/sentence'

export const OriginalSentencePanel = () => {
	const [originalSentence, { setOriginalSentence }] = useOriginalSentence()
	return (
		<Theme appearance="dark" h="full">
			<Textarea
				placeholder={`これは私の知人から聞いた話です。数年前のある日...`}
				defaultValue={originalSentence}
				onChange={e => setOriginalSentence(e.target.value)}
				resize="none"
				h="full"
				fontSize="md"
				lineHeight="tall"
			/>
		</Theme>
	)
}
