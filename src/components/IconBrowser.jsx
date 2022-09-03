import React, { useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import { ICONS_CONFIG } from '../icons'
import ReactVisibilitySensor from 'react-visibility-sensor-v2'
import TextField from '@mui/material/TextField'

const IconsBrowser = ({ index, onBrowserIconClick }) => {
    const [searchFilter, setSearchFilter] = useState('')
    const [icons, setIcons] = useState(ICONS_CONFIG)
    const iconsBoxRef = useRef(null)

    const onChangeSearch = e => {
        const value = e.target.value

        setIcons(
            ICONS_CONFIG.filter(
                icon => icon.tags.findIndex(el => el.includes(value)) > -1
            )
        )
        setSearchFilter(value)
    }

    const onClearSearch = () => {
        setIcons(ICONS_CONFIG)
        setSearchFilter('')
    }

    return (
        <>
            <TextField
                sx={{
                    marginLeft: 2,
                    marginTop: 2,
                    marginBottom: 2,
                }}
                id="search"
                label="Search"
                value={searchFilter}
                InputProps={{
                    startAdornment: <Icon sx={{ marginRight: 2 }}>search</Icon>,
                    endAdornment: (
                        <IconButton onClick={onClearSearch}>
                            <Icon>clear</Icon>
                        </IconButton>
                    ),
                }}
                onChange={onChangeSearch}
            />
            <Box
                ref={iconsBoxRef}
                sx={{
                    width: 560,
                    height: 400,
                    display: 'flex',
                    flexWrap: 'wrap',
                    overflow: 'scroll',
                    maxWidth: '100%',
                }}
            >
                {icons.map((icon, idx) => (
                    <ReactVisibilitySensor
                        key={idx}
                        // scrollCheck
                        // containment={iconsBoxRef.current}
                        // offset={{ top: 10, bottom: 10 }}
                        // scrollDelay={250}
                        partialVisibility
                    >
                        {({ isVisible }) =>
                            isVisible ? (
                                <IconButton
                                    sx={{
                                        borderRadius: 5,
                                        width: 80,
                                        height: 80,
                                    }}
                                    key={idx}
                                    onClick={() =>
                                        onBrowserIconClick(index, icon.name)
                                    }
                                >
                                    <Icon sx={{ fontSize: 80 }}>
                                        {icon.name}
                                    </Icon>
                                </IconButton>
                            ) : (
                                <Box
                                    sx={{
                                        width: 80,
                                        height: 80,
                                    }}
                                />
                            )
                        }
                    </ReactVisibilitySensor>
                ))}
            </Box>
        </>
    )
}

export default IconsBrowser
