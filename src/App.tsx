import React, {useState, useMemo, useEffect, useCallback} from 'react';
import './styles/App.css'

import MiniPostList from './components/MiniPostList';
import { observer } from 'mobx-react-lite';
import store from './store/storeF';
import Loader from './components/UI/Loader';
import MyInput from './components/UI/MyInput';
import MyButton from './components/UI/MyButton';
import Error from './components/UI/Error';

const App = observer(() =>   {

  const [word, setWord] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [track, setTrack] = useState<string>('');

  const [bool, setBool] = useState<boolean>(false);

  const [isLoad, setIsLoad] = useState <boolean> (false);

  const SetChange = (e: React.FormEvent) => {
    e.preventDefault()
    setBool(prev => !prev)
  }
  
  useEffect(() => {
    if (word.length && track.length && artist.length){
      setIsLoad(true)
      store.Final(word, artist, track).then(() => setIsLoad(false))
    }
  }, [bool]);

  const Render = useCallback(() => {
    if (!isLoad) {
      if (!word.length) {
        return <Error>Введите запрос</Error>
      } else if (!track.length || !artist.length) return <Error>Некорректно ведён артист или трек</Error>

      if (store.resPost.length > 0) return <MiniPostList />
      else return <Loader>Нет результатов</Loader>

    } else return <Loader>Загрузка</Loader>
   
  }, [isLoad, bool])

  const ChangeWord = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }, [])
  const ChangeArtist = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value)
  }, [])
  const ChangeTrack = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTrack(e.target.value)
  }, [])
  


  return (
    <div className="app">
      <div className='app__wrap'>
        <div className='app__post post-app'>
          <div className='post-app__top'>

            <form className='post-app__form'>
              <MyInput 
                IclassName={'post-app__input post-input-word'} Itype={'text'} iplaceholder={'Search'} IonChange={ChangeWord}
              />

              <MyInput  
                IclassName={'post-app__input post-input-artist'} Itype={'text'} iplaceholder={'Artist'} IonChange={ChangeArtist}
              />

              <MyInput 
                IclassName={'post-app__input post-input-title'} Itype={'text'} iplaceholder={'Track'} IonChange={ChangeTrack}
              />

              <MyButton 
                IclassName='post-app__button' Itype='submit' IonClick={SetChange}>
                {'Поиск'}
              </MyButton>
            </form>

          </div>
          <div className='post-app__centr'>
            {Render()}
          </div>
        </div>
      </div>  

    </div>
  );
})

export default App;

// rfcp
// CLIENT ID - 7gsVmX8vxXb_idxu8eNFx9rvRGeJ-5clvkbPq2F43A7_IBsOrTKeGyREzjYW5GYn
// CLIENT SECRET - P3rrcHpuPH1LU1KWcJueDnZzSuhHPF-HAyPksgFoaVvZMYTeQ_LPfBglKEok2iLBzKjXOLZ9UZJ-AmpAyrG0Lw
// CLIENT ACCESS TOKEN - AWRZQ3r57Gh2ZMQUG1SrrCPiCqrQgp1DzFEHU1cO_ex2rKDJfYIDuA0Pp4-rVJml