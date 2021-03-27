import React, { useState } from 'react'

const Pagenation = ({totalPages, pageNumber, onSetPageNumber}) => {
  // Dynamic array
  const pages = new Array(totalPages).fill(null).map((v, i) => i)
  // Page Limit as 1 to 5 , 6 to 10
  const pageNumberLimit = parseInt(process.env.REACT_APP_PAGE_LIMIT)

  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(parseInt(process.env.REACT_APP_PAGE_LIMIT))  
  
  const onPrevBtn = () => {
    onSetPageNumber(Math.max(0, pageNumber - 1))

    if ((pageNumber % pageNumberLimit) === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }

  const handlePrevPageList = () => {
    setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
    setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
  }

  const onNextBtn = () => {
    onSetPageNumber(Math.min(totalPages - 1, pageNumber + 1))

    if (pageNumber + 2 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }

  const handleNextPageList = () => {
    setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
    setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
  }

  

  return (    
    <div className="text-gray-400 flex items-center space-x-2 justify-center">
      <button 
        className={`h-8 w-8 p-1 rounded ${pageNumber !== pages[0] && 'hover:bg-gray-700'} `}
        onClick={onPrevBtn} 
        disabled={pageNumber === pages[0]}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd">                  
            </path>
        </svg>
      </button>
      <div className="space-x-1">    
        {
          (minPageNumberLimit > 1) && 
          <button className='hover:bg-gray-700  px-2 rounded' onClick={handlePrevPageList}>
            &hellip;
          </button>
        }
        {
          pages.map((pageIndex) => ((pageIndex < maxPageNumberLimit && pageIndex >= minPageNumberLimit) &&
            <button 
              className={`hover:bg-gray-700  px-2 rounded ${pageIndex === pageNumber && 'bg-purple-700 text-purple-200'}`} 
              key={pageIndex} 
              onClick={() => { onSetPageNumber(pageIndex) }}>
              {pageIndex + 1}
            </button>
          ))
        }        
        { 
          (pages.length > maxPageNumberLimit) && 
          <button className='hover:bg-gray-700  px-2 rounded' onClick={handleNextPageList}>
            &hellip;
          </button>
        }
      </div>
      <button 
        className={`h-8 w-8 p-1 rounded ${pageNumber !== pages[pages.length - 1] && 'hover:bg-gray-700'} `} 
        onClick={onNextBtn} 
        disabled={pageNumber === pages[pages.length - 1]}
      >
        <svg fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd">                
          </path>
        </svg>
      </button>
    </div>
  )
}

export default Pagenation
