import React, {useEffect, useMemo} from 'react';
import '../styles/MiniPost.css'

interface IMiniPost{
    song: string,
    lyrics: string
}

const MiniPost: React.FC<IMiniPost> = React.memo(({song, lyrics}) => {

    return (
        <div className='mini-post'>
        <div className='mini-post__song'>{song}</div>
        <div className='mini-post__lyrics'>{lyrics}</div>
        </div>
    ) 
})

export default MiniPost;
