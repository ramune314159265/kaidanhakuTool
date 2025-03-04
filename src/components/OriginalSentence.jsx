import { Textarea } from '@chakra-ui/react'
import { useOriginalSentence } from '../atoms/sentence'

export const OriginalSentence = () => {
	const [originalSentence, { setOriginalSentence }] = useOriginalSentence()
	return (
		<Textarea
			placeholder={`これは私の知人から聞いた話です。数年前のある日...`}
			defaultValue={originalSentence}
			onChange={e => setOriginalSentence(e.target.value)}
			resize="none"
			h="full"
			fontSize="md"
			lineHeight="1.75"
		/>
	)
}
