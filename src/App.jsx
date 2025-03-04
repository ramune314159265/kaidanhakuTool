import { Grid, GridItem } from '@chakra-ui/react'
import { Header } from './components/Header'
import { PlayerList } from './components/PlayerList'
import { ReplacementList } from './components/ReplacementList'
import { Sentences } from './components/Sentences'

function App() {
    return (
        <>
            <Grid templateRows="3rem 1fr" w="100%" h="100%">
                <GridItem>
                    <Header></Header>
                </GridItem>
                <GridItem w="full" h="full" p={4}>
                    <Grid gap={4} templateColumns="repeat(2, calc(50% - calc(1rem / 2)))" templateRows="repeat(2, calc(50% - calc(1rem / 2)))" w="full" h="full">
                        <GridItem overflow="auto" w="100%" h="100%">
                            <PlayerList></PlayerList>
                        </GridItem>
                        <GridItem rowSpan={2}>
                            <Sentences></Sentences>
                        </GridItem>
                        <GridItem overflow="auto" w="100%" h="100%">
                            <ReplacementList></ReplacementList>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </>
    )
}

export default App
