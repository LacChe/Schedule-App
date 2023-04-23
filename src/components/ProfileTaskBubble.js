import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { urlFor, client } from '../utils/client.js';
import { useStateContext } from '../utils/stateContext';

const ProfileTaskBubble = ({task}) => {

    const navigate = useNavigate();
    const { categories, setTaskTypes } = useStateContext();
    const [deleteStatus, setDeleteStatus] = useState('none')
    const [errorMsg, setErrorMsg] = useState('msg')

    const [color, setColor] = useState(categories?.filter((item) => item._id === task.category._id)[0]?.color.hex);

    const deleteItem = () => {
        client.delete(task._id)
        .then((res) => {
          console.log(JSON.stringify(res))
          setTaskTypes((prev) => prev.filter((item) => item._id !== task._id));
        })
        .catch(setErrorMsg('Make sure this Task isn\'t used anywhere.'))
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
          <div>
            <button type='button' onClick={() => {setDeleteStatus('none')}}>B</button>
            <div>
              <p>Delete?</p>
            </div>
            <button type='button' onClick={() => onDelete()}>-</button>
            {errorMsg}
          </div>
      )
    }

  return (
    <div>
      {task.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button' onClick={() => onDelete()}>-</button>}
      <div>
        <img  style={{'width' : '32px', 'backgroundColor' : color?color:'#666666'}}src={urlFor(task.icon.image)} alt='loading' />
        <p>{task.name} ({task.unit})</p>
      </div>
      {task.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button' onClick={() => {
        navigate(`/task/${task._id}/${task.name}/${task.unit}/${task.category._id}/${task.icon._id}`);
      }}>+</button>}
    </div>
  )
}

export default ProfileTaskBubble