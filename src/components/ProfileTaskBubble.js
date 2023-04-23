import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../utils/client.js';
import { useStateContext } from '../utils/stateContext';

const ProfileTaskBubble = ({task}) => {

    const navigate = useNavigate();
    const { categories } = useStateContext();

    const [color, setColor] = useState(categories?.filter((item) => item._id === task.category._id)[0]?.color.hex);

  return (
    <div>
      {task.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button'>-</button>}
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