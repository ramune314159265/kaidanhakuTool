import { Grid, GridItem } from '@chakra-ui/react'
import { Header } from './components/Header'

function App() {
    return (
        <>
            <Grid templateRows={"3rem 1fr"} width={"100%"} height={"100%"}>
                <GridItem>
                    <Header></Header>
                </GridItem>
                <GridItem overflowY={"auto"} p={4} scrollbarGutter="stable">
                </GridItem>
            </Grid>
        </>
    )
}

export default App
