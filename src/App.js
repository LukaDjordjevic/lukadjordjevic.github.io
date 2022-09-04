import React from 'react'
import { teal } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/system/Container'
import Slide from './components/Slide'

const theme = createTheme({
    palette: {
        primary: {
            main: teal[500],
        },
        secondary: {
            main: teal[200],
        },
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth={'md'}>
                <Slide />
            </Container>
        </ThemeProvider>
    )
}

export default App
