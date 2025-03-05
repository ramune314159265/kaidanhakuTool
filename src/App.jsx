import { Grid, GridItem } from '@chakra-ui/react'
import { Header } from './components/Header'
import { KeywordList } from './components/KeywordList'
import { PlayerList } from './components/PlayerList'
import { ReplacementList } from './components/ReplacementList'
import { Sentences } from './components/Sentences'

function App() {
    return (
        <>
            <Grid templateRows="3rem calc(100% - 3rem)" w="100%" h="100%">
                <Header></Header>
                <Grid gap={4} p={4} templateColumns="repeat(2, calc(50% - calc(2rem / 2)))" templateRows="repeat(3, calc(33.3% - calc(2rem / 3)))" w="full" h="full">
                    <GridItem overflow="auto" w="100%" h="100%">
                        <PlayerList></PlayerList>
                    </GridItem>
                    <GridItem rowSpan={2}>
                        <Sentences></Sentences>
                    </GridItem>
                    <GridItem rowSpan={2} overflow="auto" w="100%" h="100%">
                        <ReplacementList></ReplacementList>
                    </GridItem>
                    <GridItem overflow="auto" w="100%" h="100%">
                        <KeywordList></KeywordList>
                    </GridItem>
                </Grid>
            </Grid>
        </>
    )
}

export default App
