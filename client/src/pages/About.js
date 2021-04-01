import SidePanel from '../components/SidePanel'
import expressLogo from '../assests/express.png'
import mongodbLogo from '../assests/mongodb.png'
import reduxLogo from '../assests/redux.png'
import tailwindcss from '../assests/tailwindcss.png'
import unsplash from '../assests/unsplash.webp'

const About = () => {  
  return (
    <div className='bj-container'>      
      <div className='lg:w-1/2 xl:w-5/12 p-3 md:w-2/3 w-full'>
        <div className='my-4 flex flex-col items-center px-8'>
          <h1 className='text-2xl xl:text-3xl font-extrabold'>
            About
          </h1>
          <div className='w-full flex-1 my-6 text-gray-500'>
            <div className='flex items-center justify-between uppercase border-b-2 py-2 px-10 mb-2'>
              <span>Server Side</span>
              <span>Client Side</span>
            </div>
            <div className='flex items-center px-3 mb-2'>
              <div className='w-1/2 sm:w-1/3 pl-4'>
                <i className='fab fa-node w-8'></i>
                <span>NodeJS</span>
              </div>
              <div className='hidden sm:block w-1/2 sm:w-1/3 text-center'>
                <span>Language</span>
              </div>
              <div className='w-1/2 sm:w-1/3 text-right pr-4'>
                <span>Javascript</span>
                <i className='fab fa-js-square w-8'></i>
              </div>
            </div>
            <div className='flex items-center px-3 mb-2'>
              <div className='flex space-x-3 items-center w-1/2 sm:w-1/3 pl-4'>
                <img className='w-4 h-4' src={expressLogo} alt="Express"/>
                <span>Express</span>
              </div>
              <div className='hidden sm:block w-1/2 sm:w-1/3 text-center'>
                <span>Framework</span>
              </div>
              <div className='w-1/2 sm:w-1/3 text-right pr-4'>
                <span>React</span>
                <i className='fab fa-react w-8'></i>
              </div>
            </div>
            <div className='flex items-center px-3 mb-2'>
              <div className='flex space-x-3 items-center w-1/2 sm:w-1/3 pl-4'>
                <img className='w-4 h-4' src={mongodbLogo} alt="Express"/>
                <span>MongoDB</span>
              </div>
              <div className='hidden sm:block w-1/2 sm:w-1/3 text-center'>
                <span>DB / State</span>
              </div>
              <div className='flex space-x-3 w-1/2 sm:w-1/3 items-center justify-end pr-4'>
                <span>Redux</span>
                <img className='w-4 h-4' src={reduxLogo} alt="Express"/>
              </div>
            </div>
            <div className='flex items-center px-3 mb-2'>
              <div className='flex space-x-3 items-center w-1/2 sm:w-1/3 pl-4'>
              </div>
              <div className='hidden sm:block w-1/2 sm:w-1/3 text-center'>
                <span>CSS</span>
              </div>
              <div className='flex space-x-3 w-1/2 sm:w-1/3 items-center justify-end pr-4'>
                <span>TailwindCss</span>
                <img className='w-4 h-4' src={tailwindcss} alt="Express"/>
              </div>
            </div>            
            <div className='flex items-center px-3 mb-2'>
              <div className='flex space-x-3 items-center w-1/2 sm:w-1/3 pl-4'>
                <span>NodeMailer</span>
              </div>
              <div className='hidden sm:block w-1/2 sm:w-1/3 text-center'>
                <span>Mailing</span>
              </div>
              <div className='flex space-x-3 w-1/2 sm:w-1/3 items-center justify-end pr-4'>
                <span>emailJS</span>                
              </div>
            </div>
          </div>
          
          <div className='w-full flex-1 mb-1 text-gray-500'>
            <div className='flex items-center justify-between uppercase border-b-2 py-2 px-10 mb-2'>
              <span>Api</span>
              <span>Sources</span>
            </div>
            <div className='flex items-center px-3 mb-2'>
              <div className='flex space-x-3 items-center w-1/2 pl-4'>
                <a href='https://unsplash.com' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
                  <div className='flex items-center justify-center space-x-2'>
                    <img className='w-4 h-4' src={unsplash} alt="Express"/>
                    <span>Unsplash.com</span>
                  </div>
                </a>
              </div>
              <div className='w-1/2 text-right pr-4'>
                <a href='https://github.com/badjin/MERN_Authentication' target='_blank' className='hover:text-indigo-500' rel='noopener noreferrer'>
                  <span>Github</span>
                  <i className='fab fa-github-square  w-4 ml-1'></i>
                </a>
              </div>
            </div>            
          </div>

          <div className='w-full flex-1 mt-1 text-gray-500'>
            <div className='flex items-center justify-center uppercase border-b-2 py-2 px-10 mb-2'>
              <span>Database</span>
            </div>
            <div className='text-center px-2'>
              <span>You can select firebase DB and MongoDB using the <b>config.env</b> file.</span>
            </div>
          </div>

        </div>
      </div>
      <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
        <SidePanel />   
      </div>
    </div>
  )
}

export default About