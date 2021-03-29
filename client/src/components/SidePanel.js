import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSettings, getBgImagesFromUnsplash } from '../redux'


const SidePanel = () => {
  const dispatch = useDispatch()
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const location = useLocation()
  const defaultImage = 'https://source.unsplash.com/random'
  const [ backgroundImage, setBackgroundImage ] = useState(defaultImage)
  
  useEffect(() => {
    if(typeof(bgImages) === 'undefined') {
      setBackgroundImage(defaultImage)
      return
    }

    if(!bgImages.length) {
      dispatch(getSettings())
      .then(res => {
        dispatch(getBgImagesFromUnsplash(res.theme))
        .then(res => {
          setBackgroundImage(res[Math.floor(Math.random() * 20)].urls.regular)          
        })        
      })
    } else {
      let tempImage = ''
      while(true){
        tempImage = bgImages[Math.floor(Math.random() * 20)].urls.regular
        if(backgroundImage !== tempImage) break
      }
      setBackgroundImage(tempImage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className='w-full rounded-r-xl bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="flex flex-col justify-end h-full rounded-r-xl absoluteinset-0 bg-indigo-900 bg-opacity-30">            
        <h1 className='p-12 text-left text-xl text-gray-100 tracking-wide'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quam laboriosam dolorum et quasi accusamus? Eius aliquam soluta illum quasi laborum suscipit consectetur id reiciendis! Veniam alias necessitatibus accusantium distinctio.</h1>
        
      </div>
    </div>

  )
}

export default SidePanel
