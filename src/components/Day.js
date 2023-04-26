import React, { useEffect, useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

const Day = () => {
  const navigate = useNavigate();
  
  const { searchTerm, idFilters, tasks, taskTypes, categories, systemCategories, iconData } = useStateContext();
  const [date, setDate] = useState(new Date(2023, 3, 25))

  const [displayedTasks, setDisplayedTasks] = useState()

  const filterAndSearchTasks = () => {
    if(!tasks) return [];
    let tempTasks = tasks;

    // filter by date
    tempTasks = tempTasks.filter((item) => {
      const tempDate = new Date(item.date);
      const bool = date.getFullYear() === tempDate.getFullYear() &&
        date.getMonth() === tempDate.getMonth() &&
        date.getDate() === tempDate.getDate();
      return bool;
    })

    // filter by id
    tempTasks = tempTasks.filter((item) => {
      const bool = 
        !Array.from(idFilters).includes(item.taskType._ref) || 
        !Array.from(idFilters).includes(taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.category._ref);
      return bool;
    })

    // filter by search
    if(searchTerm && searchTerm !== ''){
      tempTasks = tempTasks.filter((item) => {
        const bool = taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.name?.includes(searchTerm) ||
          categories?.concat(systemCategories)?.filter((cat) => cat?._id === taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.category?._ref)[0]?.name.includes(searchTerm) ||
          item.notes?.includes(searchTerm)
        return bool;
      })
    }
    setDisplayedTasks(tempTasks);
  }

  useEffect(() => {
    filterAndSearchTasks();
  }, [tasks, date, searchTerm, idFilters])

  const taskList = (arr) => {
    return(
      arr?.length === 0 ? <div className='empty'>Empty</div> : arr?.map((item) => 
        <button key={item._id} className='item-bubble-inner' onClick={()=>{
            navigate(`/add/day/${item._id}/${item.date}/${item.taskType._ref}/${item.amount}/${item.notes}`)
          }} style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((cat) => cat?._id === taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.category?._ref)[0]?.color.hex}}>
          <img className='icon-image' src={urlFor(iconData?.filter((icon)=> taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} alt='loading' />
          <p>{taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.name} ({item.amount} {taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.unit})</p>
        </button>
      )
    )
  }
  
  return (
    <div className='day-main'>
      <div className='home-header'>
        <button type='button' onClick={()=>{setDate((prev)=>new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()-1))}}>
          <BiSkipPrevious />
        </button>
        <h1>{date.toLocaleDateString()}</h1>
        <button type='button' onClick={()=>{setDate((prev)=>new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()+1))}}>
          <BiSkipNext />
        </button>
      </div>
      {taskList(displayedTasks?.filter((item) => {
        const tempDate = new Date(item.date);
        return date.getDate() === tempDate.getDate();
      }))}
    </div>
  )
}

export default Day