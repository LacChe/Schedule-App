import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../utils/client.js';
import { useStateContext } from '../utils/stateContext.js';
import { AiOutlineEdit, AiOutlineDelete, AiFillDelete,AiOutlineWarning } from 'react-icons/ai';
import { BsBackspaceFill } from 'react-icons/bs'; 
import { toast } from 'react-hot-toast';
 

const ProfileCategoryBubble = ({ cat }) => {

    const navigate = useNavigate();
    const { setCategories } = useStateContext();

    const [deleteStatus, setDeleteStatus] = useState('none')

    const deleteItem = () => {
        client.delete(cat._id)
        .then((res) => {
          console.log(JSON.stringify(res))
          setCategories((prev) => prev.filter((item) => item._id !== cat._id));
        })
        .catch(() => {
          toast.error('Make sure this isn\'t used anywhere.');
        })
    }

    const onDelete = () => {
      switch (deleteStatus) {
        case 'none':
          setDeleteStatus('confirm');
          break;
        case 'confirm':
          deleteItem();
          setDeleteStatus('none');
          break;
        default:
          setDeleteStatus('none');
          break;
      }
    }

    if(deleteStatus === 'confirm'){
        return (
          <div className='profile-item-bubble'>
            <button className='button-delete-back' type='button' onClick={() => {setDeleteStatus('none')}}><BsBackspaceFill /></button>
            <div className='profile-item-delete' >
              <p>Delete?</p>
            </div>
            <button className='button-delete-confirm' type='button' onClick={() => onDelete()}><AiFillDelete /></button>
          </div>
      )
    }

  return (
    <div>
      <div className='profile-item-bubble'>
        {cat?.user?._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button className='button-delete' type='button' onClick={() => onDelete()}>
        <AiOutlineDelete /></button>}
        <div className='profile-item-bubble-inner' style={{'backgroundColor' : `${cat?.color?.hex}`}}>
          {urlFor(cat?.icon?.image)!=='' ? 
            <img className='icon-image' src={urlFor(cat?.icon?.image)} alt='loading' /> : 
            <AiOutlineWarning />
          }
          <p>{cat?.name}</p>
        </div>
        {cat?.user?._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button className='button-edit' type='button' onClick={() => {
          navigate(`/category/${cat?._id}/${cat?.name}/${cat?.color?.hex?.substring(1)}/${cat?.icon?._id}`);
        }}><AiOutlineEdit /></button>}
      </div>
    </div>
  )
}

export default ProfileCategoryBubble