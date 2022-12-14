import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import {
    arrayMove,
    SortableContainer,
    SortableElement,
} from 'react-sortable-hoc'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useReactToPrint } from 'react-to-print'
import Grid from '@mui/material/Grid'
import IconWithText from './IconWithText'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useTheme } from '@emotion/react'

const Slide = () => {
    const theme = useTheme()
    const slideRef = useRef(null)
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const styles = useMemo(
        () => ({
            root: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 10,
            },
            titleText: {
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontSize: 40,
                },
                '& .MuiInput-root:before': {
                    borderBottom: 'none',
                },
                marginBottom: 5,
            },
            title: {
                display: 'flex',
                justifyContent: 'center',
                marginTop: 10,
            },
            flexRow: {
                display: 'flex',
                justifyContent: 'center',
            },
        }),
        []
    )

    const initialSections = [
        {
            name: 'favorite',
            title: '',
            description: '',
        },
        {
            name: 'donut_small',
            title: '',
            description: '',
        },
        {
            name: 'thumb_up',
            title: '',
            description: '',
        },
    ]

    const [sections, setIcons] = useState(initialSections)
    const [slideTitle, setSlideTitle] = useState('')

    const SortableItem = SortableElement(({ icon, itemIndex }) => {
        return (
            <Grid item sx={styles.root} xs={7} sm={3}>
                <IconWithText
                    index={itemIndex}
                    icon={icon}
                    onChangeSectionTitle={onChangeSectionTitle}
                    onChangeDescription={onChangeDescription}
                    onBrowserIconClick={onBrowserIconClick}
                />
            </Grid>
        )
    })

    const SortableList = SortableContainer(() => {
        return (
            <Grid container justifyContent="space-around" spacing={4}>
                {sections.map((icon, index) => {
                    return (
                        <SortableItem
                            key={`item-${index}`}
                            itemIndex={index}
                            index={index}
                            icon={icon}
                        />
                    )
                })}
            </Grid>
        )
    })

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    const onKeyUp = useCallback(e => {
        if (e.target.id === 'description') return
        switch (e.keyCode) {
            case 13: // Enter
                e.target.blur()
                break
            default:
        }
    }, [])

    const onChangeSlideTitle = event => {
        const value = event.target.value
        setSlideTitle(value)
    }

    const onChangeSectionTitle = (event, index) => {
        const value = event.target.value
        const newSections = [...sections]
        newSections[index] = { ...newSections[index], title: value }
        setIcons(newSections)
    }

    const onChangeDescription = (event, index) => {
        const value = event.target.value
        const newSections = [...sections]
        newSections[index] = { ...newSections[index], description: value }
        setIcons(newSections)
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setIcons(arrayMove(sections, oldIndex, newIndex))
    }

    const onBrowserIconClick = (index, name) => {
        const newSections = [...sections]
        newSections[index] = { ...newSections[index], name }
        setIcons(newSections)
    }

    const onExportToPDF = useReactToPrint({
        content: () => slideRef.current,
    })

    return (
        <div ref={slideRef} id="slide">
            <Grid container justifyContent="space-around" spacing={4}>
                <Grid
                    item
                    sx={styles.title}
                    xs={12}
                    justifyContent="center"
                    alignItems="center"
                >
                    <TextField
                        id="slideTitle"
                        variant="standard"
                        defaultValue={slideTitle}
                        onBlur={onChangeSlideTitle}
                        sx={styles.titleText}
                        InputProps={{ placeholder: 'Insert title here' }}
                    />
                </Grid>

                <SortableList
                    onSortEnd={onSortEnd}
                    axis={isMobile ? 'y' : 'x'}
                    distance={5}
                />
                <Grid item xs={6} sx={styles.flexRow}>
                    <Button
                        sx={{ marginTop: 10 }}
                        variant="contained"
                        onClick={onExportToPDF}
                    >
                        Export to PDF
                    </Button>
                </Grid>
                <Grid item xs={6} sx={styles.flexRow}>
                    <Button
                        href={
                            'https://github.com/LukaDjordjevic/lukadjordjevic.github.io'
                        }
                        sx={{ marginTop: 10 }}
                        variant="contained"
                    >
                        GitHub repo
                    </Button>
                </Grid>
            </Grid>
        </div>
    )
}
export default Slide
