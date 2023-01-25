import { observer } from 'mobx-react';
import React, {useEffect, memo} from 'react';
import store from '../store/storeF';
import MiniPost from './MiniPost';

const MiniPostList: React.FC = observer(() => {
    
    return (
        <>  
            {store.resPost.map((post, index) => {
                if (post.rPost) return <MiniPost song={post.rTitle} lyrics={post.rPost} key={index}/>
            })}                             
        </>
    );
})

export default MiniPostList;
