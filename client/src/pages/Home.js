import Background from '../components/Background'

const Home = () => {
  // const message = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia quam laboriosam dolorum et quasi accusamus? Eius aliquam soluta illum quasi laborum suscipit consectetur id reiciendis! Veniam alias necessitatibus accusantium distinctio.'
  const message = 'Ultimate Authentication with Email & Google with diferent roles, email verification & Forget password'
  
  
  return (
    <>
      <Background message={message} />
    </>
    // <div className='bj-container'>
    //   <div className='lg:w-1/2 xl:w-8/12 p-6 sm:p-6'>
    //     <div className='my-4 flex flex-col items-center'>
    //       <h1 className='text-2xl xl:text-2xl font-extrabold  text-center '>
    //         Ultimate Auth with Email & Google with diferent roles,
    //         email verification & Forget password
    //       </h1>
    //       <div className='w-full my-6 flex-1 text-indigo-500'>
    //         <div className='mb-8 border-b text-center'>
    //           <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white'>
    //             Features
    //           </div>
    //         </div>
    //         <div className='mx-auto max-w-xs'>
    //           <Link
    //             to='/login'
    //             className='btn mt-5 bg-indigo-500 text-gray-100 hover:bg-indigo-700'
    //           >
    //             <i className='fas fa-sign-in-alt  w-6  -ml-2' />
    //             <span className='ml-3'>Sign In</span>
    //           </Link>
    //           <Link
    //             to='/register'
    //             className='btn mt-5 bg-gray-500 text-gray-100 hover:bg-gray-700'
    //           >
    //             <i className='fas fa-user-plus  w-6  -ml-2' />
    //             <span className='ml-3'>Sign Up</span>
    //           </Link>
    //           <Link
    //             to='/profile'
    //             className='btn mt-5 bg-yellow-500 text-gray-100 hover:bg-yellow-700'
    //           >
    //             <i className='fas fa-sign-in-alt  w-6  -ml-2' />
    //             <span className='ml-3'>Profile Dashbaord</span>
    //           </Link>
    //           <Link
    //             to='/admin'
    //             className='btn mt-5 bg-green-500 text-gray-100 hover:bg-green-700 '
    //           >
    //             <i className='fas fa-sign-in-alt  w-6  -ml-2' />
    //             <span className='ml-3'>Admin Dashbaord</span>
    //           </Link>
    //           <button
    //             onClick={logout}
    //             className='btn mt-5 bg-pink-500 text-gray-100 hover:bg-pink-700'
    //           >
    //             <i className='fas fa-sign-out-alt  w-6  -ml-2' />
    //             <span className='ml-3'>Signout</span>
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div> 
  )
}

export default Home