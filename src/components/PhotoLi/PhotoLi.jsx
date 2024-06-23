import './PhotoLi.css'

import { useContext , useState , useEffect } from 'react'
import { FlickrContext } from '../../App'

export const PhotoLi = (props)=>{

    const {server , id , secret , title , owner} = props
    
    const { VITE_APIKEY } = import.meta.env

    const { showViewbox } = useContext(FlickrContext)

    const [ user , setUser ] = useState()

    const getUserInfo = async ()=>{
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
            }
      
        await fetch(`https://www.flickr.com/services/rest/?format=json&nojsoncallback=1&method=flickr.people.getInfo&api_key=${VITE_APIKEY}&user_id=${owner}` , options)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch( err => console.log(err.message))
        .finally(()=> controller.abort())
      }
    
    useEffect(()=>{
        getUserInfo()
    }, [])
    
    return(
        <>
        <li className='Photo-li' onClick={()=> showViewbox(id , secret , title , server)}>
            <picture className='Photo-picture'>
                <img className='Photo-img' src={`https://live.staticflickr.com/${server}/${id}_${secret}_w.jpg`} alt={title} loading='lazy' />
            </picture>
            <div className="Photo-description Description">
                <div className="Description-wrapper">
                    <h3 className='Description-h3 H3'>{!title ? 'Sin título' : title}</h3>
                    <span className="Description-span">por {user && user.person && user.person.realname_content ? user.person.realname._content : 'Anónimo'}</span>   
                </div>
            </div>
        </li>
        </>
    )
}