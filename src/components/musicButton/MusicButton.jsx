import React, { useRef, useState } from 'react'
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';

export const MusicButton = () => {
    const [muteMusic, setMuteMusic] = useState(false)

    const music = useRef(new Audio('music.mp3'))
    music.current.loop = true

    const playStopMusic = () => {
        if (!muteMusic) {
            setMuteMusic(true)
            music.current.play()
        } else {
            setMuteMusic(false)
            music.current.pause()
        }
    }

    return (
        <div className='musicButtonContainer'>
            <button className='musicButton' onClick={() => playStopMusic()}>{!muteMusic ? <MusicNoteIcon className='musicIcon' /> : <MusicOffIcon className='musicIcon' />}</button>
        </div>
    )
}
