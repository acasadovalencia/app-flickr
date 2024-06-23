import { useContext, useEffect , useState } from 'react'
import './Recents.css'
import { FlickrContext } from '../../App'
import { Viewbox } from '../../components/Viewbox/Viewbox'
import { PhotoLi } from './../../components/PhotoLi/PhotoLi'


export const Recents = ()=>{

    const { recentPhotos , selectedPhoto } = useContext(FlickrContext)

    return(
        <>
        <main>
            <section className="Recents-section">
                <div className="Recents-wrapper">
                    <h2 className='Recents-h2 H2'>Imágenes subidas recientemente</h2>
                    <ul className="Recents-ul">
                    {!recentPhotos && <li className='Loading-li'>
                        <span className='Loading-span'>Cargando fotos recientes...</span>
                        <svg className="Loading-svg" width="240" height="240" viewBox="0 0 240 240">
                            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        </svg>
                        </li>}
                    {recentPhotos && recentPhotos.photos && recentPhotos.photos.photo && recentPhotos.photos.photo.map( eachPhoto =>
                    <PhotoLi key={eachPhoto.id} {...eachPhoto}/>
                    )}
                    </ul>
                </div>
                {selectedPhoto && 
                    <Viewbox/>
                }
            </section>
        </main>
        </>
    )
}


