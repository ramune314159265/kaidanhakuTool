import { Grid, GridItem } from '@chakra-ui/react'
import { Header } from './components/Header'
import { PlayerList } from './components/PlayerList'
import { ReplacementList } from './components/ReplacementList'

function App() {
    return (
        <>
            <Grid templateRows="3rem 1fr" w="100%" h="100%">
                <GridItem>
                    <Header></Header>
                </GridItem>
                <GridItem w="full" h="full" p={4}>
                    <Grid gap={4} templateColumns="1fr 1fr" templateRows="1fr 1fr" w="full" h="full">
                        <GridItem>
                            <PlayerList></PlayerList>
                        </GridItem>
                        <GridItem rowSpan={2}>b</GridItem>
                        <GridItem>
                            <ReplacementList></ReplacementList>
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </>
    )
}

export default App
