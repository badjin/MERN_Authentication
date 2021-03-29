import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Background = ({message}) => {  
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const defaultImage = 'https://source.unsplash.com/random'
  const [ backgroundImage, setBackgroundImage ] = useState(defaultImage)

  useEffect(() => {
    if(typeof(bgImages) === 'undefined') {
      setBackgroundImage(defaultImage)
      return
    }

    if(!bgImages.length) {
      setBackgroundImage(defaultImage)
      return
    }

    let tempImage = ''
    while(true){
      tempImage = bgImages[Math.floor(Math.random() * 20)].urls.regular
      if(backgroundImage !== tempImage) break
    }
    setBackgroundImage(tempImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className='w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${backgroundImage})` }} >
      <div className="flex justify-center items-center h-full rounded-r-xl absoluteinset-0 bg-indigo-900 bg-opacity-30">            
        <h1 className='p-12 lg:w-1/2 xl:w-5/12 p-3 sm:p-6 font-bold text-center text-2xl text-gray-100 tracking-wide'>{message}</h1>        
      </div>
    </div>
  )
}

export default Background