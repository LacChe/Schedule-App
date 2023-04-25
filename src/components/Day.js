import React from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { urlFor } from '../utils/client.js';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const Day = () => {
  const navigate = useNavigate();
  
  const { searchTerm, idFilters, tasks, taskTypes, categories, systemCategories } = useStateContext();

  return (
    <div>
      <h1>DAYDAYDAYDAY</h1>
      <h1>DAYDAYDAYDAY</h1>
      <h1>DAYDAYDAYDAY</h1>
      <h1>DAYDAYDAYDAY</h1>
      <h1>DAYDAYDAYDAY</h1>
      {tasks?.length === 0 ? <div className='item-empty'>Empty</div> : tasks?.map((item) => 
        <button key={item._id} className='item-bubble-inner' onClick={()=>{
            navigate(`/add/day/${item._id}/${item.date}/${item.taskType._id}/${item.amount}/${item.notes}`)
          }} style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((cat) => cat?._id === taskTypes.filter((taskType) => taskType._id === item.taskType._id)[0]?.category?._id)[0]?.color.hex}}>
          {urlFor(taskTypes.filter((taskType) => taskType._id === item.taskType._id)[0].icon.image)!=='' ? 
            <img className='icon-image' src={urlFor(taskTypes.filter((taskType) => taskType._id === item.taskType._id)[0].icon.image)} alt='loading' /> : 
            <AiOutlineWarning />
          }
          <p>{taskTypes.filter((taskType) => taskType._id === item.taskType._id)[0].name} ({item.amount} {taskTypes.filter((taskType) => taskType._id === item.taskType._id)[0].unit})</p>
        </button>
      )}
    </div>
  )
}

export default Day