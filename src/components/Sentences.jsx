import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@chakra-ui/react'
import { OriginalSentence } from './OriginalSentence'
import { ReplacedSentence } from './ReplacedSentence'

export const Sentences = () => {
	return (
		<TabsRoot defaultValue="replaced" h="full" variant="line">
			<TabsList >
				<TabsTrigger value="original">元の文章</TabsTrigger>
				<TabsTrigger value="replaced">置き換え後の文章</TabsTrigger>
			</TabsList>
			<TabsContent value="original" h="calc(100% - 50px)">
				<OriginalSentence></OriginalSentence>
			</TabsContent>
			<TabsContent value="replaced" h="calc(100% - 50px)">
				<ReplacedSentence></ReplacedSentence>
			</TabsContent>
		</TabsRoot>
	)
}
