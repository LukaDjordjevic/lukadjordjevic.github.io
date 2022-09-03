import React from 'react'
// import "./App.css";
import { teal } from '@mui/material/colors'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Container from '@mui/system/Container'
// import ICONS_CONFIG from './icons'
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

const styles = {
    root: {
        // backgroundColor: 'secondary.main',
    },
}

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container sx={styles.root} maxWidth={'sm'}>
                <Slide />
                {/* {ICONS_CONFIG.map(icon => {
return (
<IconButton key={icon.name}>
    <Icon>{icon.name}</Icon>
</IconButton>
)
})} */}
            </Container>
        </ThemeProvider>
    )
}

export default App
