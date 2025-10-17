import { Box, Grid } from '@chakra-ui/react'
import { Layout, Model } from 'flexlayout-react'
import { useLayout } from './atoms/layout'
import { Header } from './components/Header'
import { KeywordListPanel } from './components/KeywordListPanel'
import { OriginalSentencePanel } from './components/OriginalSentencePanel'
import { PlayerListPanel } from './components/PlayerListPanel'
import { ReplacedSentencePanel } from './components/ReplacedSentencePanel'
import { ReplacementListPanel } from './components/ReplacementListPanel'
import './flexlayout.css'

function App() {
    const [layout, { saveLayout }] = useLayout()
    const factory = (node) => {
        const comp = node.getComponent()
        if (comp === 'playerList') return <PlayerListPanel></PlayerListPanel>
        if (comp === 'replacementList') return <ReplacementListPanel></ReplacementListPanel>
        if (comp === 'originalSentence') return <OriginalSentencePanel></OriginalSentencePanel>
        if (comp === 'replacedSentence') return <ReplacedSentencePanel></ReplacedSentencePanel>
        if (comp === 'keywordList') return <KeywordListPanel></KeywordListPanel>
        return <div></div>
    }
    const model = Model.fromJson(layout)

    return (
        <Grid templateRows="3rem calc(100% - 3rem)" w="100dvw" h="100dvh" position="relative">
            <Header></Header>
            <Box position="relative" w="100%" h="100%">
                <Layout
                    model={model}
                    factory={factory}
                    onModelChange={() => saveLayout(model.toJson())}
                />
            </Box>
        </Grid>
    )
}

export default App
