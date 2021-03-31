import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentBgImage } from '../redux'

const About = () => {    

  const dispatch = useDispatch()
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const currentBgImage = useSelector(state => state.bgImage.currentBgImage)
  const [ backgroundImage, setBackgroundImage ] = useState('')
  
  useEffect(() => {    
    let tempImage = ''
    while(true){
      tempImage = bgImages[Math.floor(Math.random() * 20)].urls.regular
      if(currentBgImage !== tempImage) break
    }
    dispatch(setCurrentBgImage(tempImage))
    setBackgroundImage(tempImage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {backgroundImage &&
        <div className='w-full bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${backgroundImage})` }} >
          <div className="flex justify-center items-center h-full absoluteinset-0 bg-indigo-900 bg-opacity-30">            
            <h1 className='p-12 lg:w-1/2 xl:w-5/12 p-3 sm:p-6 font-bold text-center text-2xl text-gray-100 tracking-wide'>about JIN KIM</h1>        
          </div>
        </div>      
      }
    </>
  )
}

export default About