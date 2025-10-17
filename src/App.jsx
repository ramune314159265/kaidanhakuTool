import { Box, Grid } from '@chakra-ui/react'
import { Layout, Model } from 'flexlayout-react'
import 'react-contexify/dist/ReactContexify.css'
import { useLayout } from './atoms/layout'
import { Header } from './components/Header'
import { KeywordListPanel } from './components/KeywordListPanel'
import { OriginalSentencePanel } from './components/OriginalSentencePanel'
import { PanelAddMenu } from './components/PanelAddMenu'
import { PlayerListPanel } from './components/PlayerListPanel'
import { ReplacedSentencePanel } from './components/ReplacedSentencePanel'
import { ReplacementListPanel } from './components/ReplacementListPanel'
import './flexlayout.css'

function App() {
    const [layout, { saveLayout }] = useLayout()
    const getComponent = id => {
        if (id === 'playerList') return <PlayerListPanel></PlayerListPanel>
        if (id === 'replacementList') return <ReplacementListPanel></ReplacementListPanel>
        if (id === 'originalSentence') return <OriginalSentencePanel></OriginalSentencePanel>
        if (id === 'replacedSentence') return <ReplacedSentencePanel></ReplacedSentencePanel>
        if (id === 'keywordList') return <KeywordListPanel></KeywordListPanel>
        return <div></div>
    }
    const factory = node => {
        const comp = node.getComponent()
        return getComponent(comp)
    }
    const model = Model.fromJson(layout)

    const onRenderTabSet = (tabSetNode, renderValues) => {
        renderValues.stickyButtons.push(
            <PanelAddMenu id={tabSetNode.getId()} model={model} key='add'></PanelAddMenu>
        )
    }


    return (
        <>
            <Grid templateRows="3rem calc(100% - 3rem)" w="100dvw" h="100dvh" position="relative">
                <Header></Header>
                <Box position="relative" w="100%" h="100%">
                    <Layout
                        model={model}
                        factory={factory}
                        onModelChange={() => saveLayout(model.toJson())}
                        onRenderTabSet={onRenderTabSet}
                    />
                </Box>
            </Grid>
        </>
    )
}

export default App
