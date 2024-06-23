import { createContext, useEffect, useState , useRef } from 'react'
import { BrowserRouter , Routes , Route} from 'react-router-dom'
import './App.css'
import { Header } from '@components/Header/Header'
import { Recents } from '@pages/Recents/Recents'
import { Search } from '@pages/Search/Search'
import { Footer } from '@components/Footer/Footer'

export const FlickrContext = createContext()

function App() {

const { VITE_APIKEY } = import.meta.env


// Refs

const formSearch = useRef()

// States

const [ recentPhotos , setRecentPhotos ] = useState()
const [ recentPhoto , setRecentPhoto ] = useState()
const [ selectedPhoto , setSelectedPhoto ] = useState(``)
const [ searchPhoto , setSearchPhoto] = useState()

// Functions

const showViewbox = (id , secret , title , server)=>{
  const photoViewbox = {
      id,
      secret,
      title,
      server
  }
  setSelectedPhoto(photoViewbox)
}

// Fetchs

const getRecents = async ()=>{
  let controller = new AbortController()
  let options = {
    method: 'get',
    signal: controller.signal
    }

  await fetch(`https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.photos.getRecent&api_key=${VITE_APIKEY}&page=1` , options)
  .then(res => res.json())
  .then(data => setRecentPhotos(data))
  .catch( err => console.log(err.message))
  .finally(()=> controller.abort())
}

const getSearch = async (text)=>{
  let controller = new AbortController()
  let options = {
    method: 'get',
    signal: controller.signal
    }

  await fetch(`https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&text=${text}&method=flickr.photos.search&api_key=${VITE_APIKEY}` , options)
  .then(res => res.json())
  .then(data => setSearchPhoto(data))
  .catch( err => console.log(err.message))
  .finally(()=> controller.abort())
}
 
// Effects

useEffect(()=>{
  getRecents()
}, [])

  return (
    <BrowserRouter>
    <FlickrContext.Provider value={{recentPhotos , setRecentPhotos, getRecents , recentPhoto , setRecentPhoto , selectedPhoto , setSelectedPhoto , showViewbox , getSearch , searchPhoto , setSearchPhoto , formSearch}}>
    <>
     <Header/>
     <Routes>
      <Route path='/' element={<Recents/>}/>
      <Route path={`/search/`} element={<Search/>}/>
     </Routes>
     <Footer/>
    </>
    </FlickrContext.Provider>
    </BrowserRouter>
  )
}

export default App
