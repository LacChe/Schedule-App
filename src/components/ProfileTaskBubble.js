import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { urlFor, client } from '../utils/client.js';
import { useStateContext } from '../utils/stateContext';
import { AiOutlineEdit, AiOutlineDelete, AiFillDelete } from 'react-icons/ai';
import { BsBackspaceFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

const ProfileTaskBubble = ({task}) => {

    const navigate = useNavigate();
    const { categories, systemCategories, setTaskTypes, taskTypes, iconData } = useStateContext();
    const [deleteStatus, setDeleteStatus] = useState('none')
    
    const deleteItem = () => {
        client.delete(task._id)
        .catch(() => {
          toast.error('Make sure this isn\'t used anywhere.');
        })
        localStorage.setItem('task-types', JSON.stringify(taskTypes.filter((item) => item._id !== task._id)));
        setTaskTypes((prev) => prev.filter((item) => item._id !== task._id));
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
        {task.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button className='button-delete' type='button' onClick={() => onDelete()}>
          <AiOutlineDelete /></button>}
        <div className='item-bubble-inner' style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((item) => item?._id === task?.category?._ref)[0]?.color.hex}}>
          <img className='icon-image' src={urlFor(iconData?.filter((item)=>task?.icon?._ref===item?._id)[0]?.image?.asset?._ref)} alt='loading' />
          <p>{task.name} ({task.unit})</p>
        </div>
        {task.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button className='button-edit' type='button' onClick={() => {
          navigate(`/task/${task._id}/${task.name}/${task.unit}/${task.category._id}/${task.icon._id}`);
        }}><AiOutlineEdit /></button>}
      </div>
    </div>
  )
}

export default ProfileTaskBubble