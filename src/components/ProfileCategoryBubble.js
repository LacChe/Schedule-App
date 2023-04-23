import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../utils/client.js';
import { useStateContext } from '../utils/stateContext.js';

const ProfileCategoryBubble = ({ cat }) => {

    const navigate = useNavigate();
    const { setCategories } = useStateContext();

    const [deleteStatus, setDeleteStatus] = useState('none')
    const [errorMsg, setErrorMsg] = useState('msg')

    const deleteItem = () => {
        client.delete(cat._id)
        .then((res) => {
          console.log(JSON.stringify(res))
          setCategories((prev) => prev.filter((item) => item._id !== cat._id));
        })
        .catch(setErrorMsg('Make sure this Category isn\'t used anywhere.'))
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
        {cat?.user?._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button' onClick={() => onDelete()}>-</button>}
        <div>
          <img  style={{'width' : '32px', 'backgroundColor' : `${cat?.color?.hex}`}} src={urlFor(cat?.icon?.image)} alt='loading' />
          <p>{cat?.name}</p>
        </div>
        {cat?.user?._id !== process.env.REACT_APP_SANITY_SYSTEM_USER_ID && <button type='button' onClick={() => {
          navigate(`/category/${cat?._id}/${cat?.name}/${cat?.color?.hex?.substring(1)}/${cat?.icon?._id}`);
        }}>+</button>}
        {errorMsg}
      </div>
  )
}

export default ProfileCategoryBubble