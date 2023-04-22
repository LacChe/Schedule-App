import React from "react";
import { useStateContext } from '../utils/stateContext';
import { useNavigate } from 'react-router-dom';
import { urlFor } from '../utils/client.js';

const Profile = () => {
  const { userData, categories, taskTypes } = useStateContext();
  const navigate = useNavigate();

  const userTaskTypes = taskTypes?.filter((item) => item.user._id === userData[0]._id);
  const userCategories = categories?.filter((item) => item.user._id === userData[0]._id);

  const itemBubble = (item) => {
    return (
      <div key={item._id}>
        <button type='button'>-</button>
        <div>
          <img src={urlFor(/*item.icon.image*/)} alt='loading' />
          <p>{item.name}</p>
        </div>
        <button type='button'>+</button>
      </div>
    )
  }

  if (!userData) {
    return <div>Loading ...</div>;
  }

  return (
    <div>

      <div>
          <img src={userData[0]?.imageUrl} alt='user-avatar' />
          <h1>{userData[0]?.userName}</h1>
      </div>

      <div>
        <h1>Task</h1>
        {userTaskTypes?.length === 0 ? <div>No Tasks</div> : userTaskTypes?.map((item) => (itemBubble(item)))}
        <button type='button' onClick={()=> {
          navigate('/task');
        }}>New Task Type</button>
      </div>
      
      <div>
        <h1>Categories</h1>
        {userCategories?.length === 0 ? <div>No Categories</div> : userCategories?.map((item) => (itemBubble(item)))}
        <button type='button' onClick={()=> {
          navigate('/category');
        }}>New Category</button>
      </div>

    </div>
  );
};

export default Profile;