import React from 'react'
import { useState } from 'react';

function Pagination() {
   

  
  return (
    <div>
        <nav>
            <ul className='pagination'>
                <li className='page-item'>
                    <a href="#" className='page-link' >Prev</a>
                </li>
                {/* {
                  numbers.map((n,i) => (
                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                      <a href="#" className='page-link' onClick={()=> changeCPage(n)}>{n}</a>
                    </li>
                  ))
                } */}
                <li className='page-item'>
                  <a href="#" className='page-link' >Next</a>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Pagination