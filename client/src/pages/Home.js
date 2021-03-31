import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const bgImages = useSelector(state => state.bgImage.bgImages)
  const [randomNumber, setRandomNumber] = useState([])

  // get random number 3
  const getRandomImages = () => {
    let arr = []
    for(let i = 0; i < 3; i++){
      arr.push(Math.floor(Math.random()*20));
      for(let c = 0; c<i; c++){
        if (arr[i] === arr[c]) {
          arr.pop()
          i--; 
        }
      }
    }
    return arr
  }
  
  useEffect(() => {
    setRandomNumber(getRandomImages())
  },[])

  return (
      
    <div className='max-w-screen-xl m-0 lg:m-10 bg-white shadow sm:rounded-lg flex flex-col justify-center items-center'>
      {randomNumber.length && 
        (
          <>
            <div className='flex justify-between items-center p-10 mt-10'>
              <div className='w-1/2 px-5'>
                <h2 className='text-4xl text-gray-500 mb-6'>Welcome</h2>
                <p>New to the hobby or want to keep up with latest board game trends? Talk with fellow gamers, discover new games, and use money saving features to find the best deals.</p>
              </div>
              <div className='w-1/2 overflow-hidden'>
                <img className='w-full bg-cover bg-center bg-no-repeat rounded' src={bgImages[randomNumber[0]].urls.regular} alt="Welcome"/>
              </div>
            </div>
            <div className='flex justify-between items-center p-10'>
              <div className='w-1/2 overflow-hidden'>
                <img className='w-full bg-cover bg-center bg-no-repeat rounded' src={bgImages[randomNumber[1]].urls.regular} alt="Sample"/>
              </div>
              <div className='w-1/2 px-5'>
                <h2 className='text-4xl text-gray-500 mb-6'>What's new</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quam laboriosam dolorum et quasi accusamus? Eius aliquam soluta illum quasi laborum suscipit consectetur id reiciendis! Veniam alias necessitatibus accusantium distinctio.</p>
              </div>
            </div>
            <div className='flex justify-between items-center p-10 mb-10'>
              <div className='w-1/2 px-5'>
                <h2 className='text-4xl text-gray-500 mb-6'>Paly and Enjoy</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quam laboriosam dolorum et quasi accusamus? Eius aliquam soluta illum quasi laborum suscipit consectetur id reiciendis! Veniam alias necessitatibus accusantium distinctio.</p>
              </div>
              <div className='w-1/2 overflow-hidden'>
                <img className='w-full bg-cover bg-center bg-no-repeat rounded' src={bgImages[randomNumber[2]].urls.regular} alt="Sample"/>
              </div>
            </div> 
          </>
        )
      }      
    </div>
  )
}

export default Home