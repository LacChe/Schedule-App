import React from 'react'
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../utils/client.js';

const ProfileCategoryBubble = ({ cat }) => {

    const navigate = useNavigate();

  return (
      <div>
        {cat.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button'>-</button>}
        <div>
          <img  style={{'width' : '32px', 'backgroundColor' : `${cat?.color?.hex}`}}src={urlFor(cat.icon.image)} alt='loading' />
          <p>{cat.name}</p>
        </div>
        {cat.user._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button' onClick={() => {
          navigate(`/category/${cat._id}/${cat.name}/${cat.color.hex.substring(1)}/${cat.icon._id}`);
        }}>+</button>}
      </div>
  )
}

export default ProfileCategoryBubble