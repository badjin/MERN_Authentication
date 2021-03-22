import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'


const SidePanel = () => {
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const location = useLocation()
  const defaultImage = 'https://source.unsplash.com/random'
  const [ backgroundImage, setBackgroundImage ] = useState(defaultImage)

  useEffect(() => {
    if(!bgImages) {
      setBackgroundImage(defaultImage)
      return
    }    
    setBackgroundImage(bgImages[Math.floor(Math.random() * 10)].urls.regular)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      <div
          className='w-full rounded-r-xl bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="flex flex-col justify-end h-full rounded-r-xl absoluteinset-0 bg-indigo-900 bg-opacity-30">            
            <h1 className='p-12 text-left text-xl text-gray-100 tracking-wide'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quam laboriosam dolorum et quasi accusamus? Eius aliquam soluta illum quasi laborum suscipit consectetur id reiciendis! Veniam alias necessitatibus accusantium distinctio.</h1>
            
          </div>
        </div>
    </>
  )
}

export default SidePanel
