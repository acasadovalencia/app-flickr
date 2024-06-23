import './Viewbox.css'

import { useContext, useEffect } from 'react'
import { FlickrContext } from './../../App';


export const Viewbox = ()=>{

    const {selectedPhoto , setSelectedPhoto} = useContext(FlickrContext)

    const closeKeyHandler = (e)=>{
        
        if(e.key == 'Escape'){
            setSelectedPhoto('')
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown' , closeKeyHandler)
        return () => {
            document.removeEventListener('keydown', closeKeyHandler);
        };
    }, [])
    
    return(

        <>
        <div onKeyDown={closeKeyHandler} className={`Recents-viewbox Viewbox ${selectedPhoto ? 'isActive' : ''} `}>
            <div className="Viewbox-wrapper">
                <picture className="Viewbox-picture">
                    <img className='Viewbox-img' src={`https://live.staticflickr.com/${selectedPhoto.server}/${selectedPhoto.id}_${selectedPhoto.secret}.jpg`} alt={selectedPhoto.title} loading='lazy' />
                </picture>
            </div>
            <svg onClick={()=>setSelectedPhoto('')} className="Viewbox-close" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
        </div>
        </>
    )
}