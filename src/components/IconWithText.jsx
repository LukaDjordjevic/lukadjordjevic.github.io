import React, { useMemo, useState, useCallback, useEffect } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import IconsBrowser from './IconBrowser'
import Popover from '@mui/material/Popover'

const IconWithText = ({
    icon,
    index,
    onChangeTitle,
    onChangeDescription,
    onBrowserIconClick,
}) => {
    const { name, title, description } = icon
    const [anchorEl, setAnchorEl] = useState(null)

    const styles = useMemo(
        () => ({
            input: {
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                },
                '& .MuiInput-root:before': {
                    borderBottom: 'none',
                },
            },
            descriptionInput: {
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontSize: 12,
                },
                '& .MuiInput-root:before': {
                    borderBottom: 'none',
                },
            },
        }),
        []
    )

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])

    const onKeyUp = useCallback(e => {
        switch (e.keyCode) {
            case 13: // enter
                e.target.blur()
                break
        }
    }, [])

    const onIconClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const onClosePopover = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <>
            <IconButton sx={{ borderRadius: 5 }} onClick={onIconClick}>
                <Icon sx={{ fontSize: 100 }}>{name}</Icon>
            </IconButton>
            <TextField
                id="title"
                InputProps={{ placeholder: 'Insert text here' }}
                variant="standard"
                defaultValue={title}
                onBlur={event => onChangeTitle(event, index)}
                sx={styles.input}
            />
            <TextField
                id="description"
                InputProps={{ placeholder: 'Add additional text here' }}
                variant="standard"
                defaultValue={description}
                onBlur={event => onChangeDescription(event, index)}
                sx={styles.descriptionInput}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={onClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <IconsBrowser
                    onBrowserIconClick={onBrowserIconClick}
                    index={index}
                />
            </Popover>
        </>
    )
}

export default IconWithText
