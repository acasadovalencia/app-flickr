import './Search.css'
import { useContext } from 'react'
import { FlickrContext } from '../../App'
import { PhotoLi } from '../../components/PhotoLi/PhotoLi'
import { Viewbox } from '../../components/Viewbox/Viewbox'

export const Search = ()=>{

    const { searchPhoto , selectedPhoto , formSearch } = useContext(FlickrContext)

    const { current: form} = formSearch

    return(
        <>
        <main>
            <section className="Search-section">
                <div className="Search-wrapper">
                    <h2 className='Search-h2 H2'>Imágenes sobre {form['search'].value}</h2>
                    <ul className="Search-ul">
                    {form['search'].value === '' && <li>Escribe un término de búsqueda</li> }
                    {!searchPhoto && <li className='Loading-li'>
                        <span className='Loading-span'>Buscando fotos...</span>
                        <svg className="Loading-svg" width="240" height="240" viewBox="0 0 240 240">
                            <circle className="pl__ring pl__ring--a" cx="120" cy="120" r="105" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 660" strokeDashoffset="-330" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--b" cx="120" cy="120" r="35" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 220" strokeDashoffset="-110" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--c" cx="85" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                            <circle className="pl__ring pl__ring--d" cx="155" cy="120" r="70" fill="none" stroke="#000" strokeWidth="20" strokeDasharray="0 440" strokeLinecap="round"></circle>
                        </svg>
                        </li>}
                    {searchPhoto && searchPhoto.photos && searchPhoto.photos.photo && searchPhoto.photos.photo.map( eachPhoto =>
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