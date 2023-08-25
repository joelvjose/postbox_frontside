import React from 'react'

const PostDetailModal = ({ isVisible, onClose, postID }) => {

    if( !isVisible ) return null;

    const handleClose = (e) =>{
        if(e.target.id === 'wrapper') onClose();
    }
  return (
    <div
      className="z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="m-2 w-3/5 flex flex-col">
        <button className="text-white text-xl place-self-end" onClick={onClose}>
          x
        </button>
        <div className="bg-white p-2 rounded">
            <div className='flex flex-row'>
                <div className='w-full h-full bg-slate-600'></div>
                <div className='w-full h-full bg-green-400'></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetailModal
