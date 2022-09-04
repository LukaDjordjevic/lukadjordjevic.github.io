import React, { useMemo, useState } from 'react'
import Icon from '@mui/material/Icon'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import IconsBrowser from './IconBrowser'
import Popover from '@mui/material/Popover'

const IconWithText = ({
    icon,
    index,
    onChangeSectionTitle,
    onChangeDescription,
    onBrowserIconClick,
}) => {
    const { name, title, description } = icon
    const styles = useMemo(
        () => ({
            titleInput: {
                marginTop: 1,
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontSize: 20,
                },
                '& .MuiInput-root:before': {
                    borderBottom: 'none',
                },
            },
            descriptionInput: {
                marginTop: 2,
                '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontSize: 15,
                },
                '& .MuiInput-root:before': {
                    borderBottom: 'none',
                },
            },
        }),
        []
    )

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const onIconClick = event => {
        setAnchorEl(event.currentTarget)
    }

    const onClosePopover = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton sx={{ borderRadius: 5 }} onClick={onIconClick}>
                <Icon sx={{ fontSize: 100 }}>{name}</Icon>
            </IconButton>
            <TextField
                id="title"
                InputProps={{
                    placeholder: 'Insert text',
                }}
                variant="standard"
                defaultValue={title}
                onBlur={event => onChangeSectionTitle(event, index)}
                sx={styles.titleInput}
            />
            <TextField
                id="description"
                InputProps={{
                    placeholder: 'Add additional text',
                    multiline: true,
                }}
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
