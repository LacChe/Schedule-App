import React, { useEffect, useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { urlFor } from '../utils/client.js';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';

const Day = ({ isDemo, expandedIndex }) => {
  const navigate = useNavigate();
  
  const { searchTerm, idFilters, tasks, taskTypes, categories, systemCategories, iconData } = useStateContext();
  const { dateParam } = useParams();
  const [date, setDate] = useState(
    dateParam ? new Date(dateParam.split('-')[0], dateParam.split('-')[1]-1, dateParam.split('-')[2]) : new Date()
  )

  const [displayedTasks, setDisplayedTasks] = useState()
  const [expandedTaskId, setExpandedTaskId] = useState()

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
        !Array.from(idFilters).includes(taskTypes?.filter(
            (taskType) => taskType._id === item?.taskType?._ref
          )[0]?.category._ref);
      return bool;
    })

    // filter by search
    if(searchTerm && searchTerm !== ''){
      tempTasks = tempTasks.filter((item) => {
        return taskTypes?.filter(
            (taskType) => taskType._id === item?.taskType?._ref
            )[0]?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||

          categories?.concat(systemCategories)?.filter(
              (cat) => cat?._id === taskTypes?.filter(
                (taskType) => taskType._id === item?.taskType?._ref
              )[0]?.category?._ref
            )[0]?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            
          item.notes?.toLowerCase().includes(searchTerm.toLowerCase()
        );
      })
    }

    setDisplayedTasks(tempTasks);
  }

  useEffect(() => {
    filterAndSearchTasks();
    if(expandedIndex !== undefined) {
      setExpandedTaskId(tasks[expandedIndex]._id);
    }
  }, [tasks, date, searchTerm, idFilters])

  const taskList = (arr) => {
    return(
      arr?.length === 0 ? 
        <div className='empty'>Empty</div> : 
          arr?.map((item) => 
          <div className='task-wrapper' key={item._id}>
            <button className='button-task-bubble' 
              onClick={()=>{setExpandedTaskId((prev)=>prev===item._id?'':item._id)}} 
              style={{'backgroundColor' : categories?.concat(systemCategories)?.filter(
              (cat) => cat?._id === taskTypes?.filter(
                    (taskType) => taskType._id === item?.taskType?._ref
                  )[0]?.category?._ref
                )[0]?.color.hex}}
            >
              <div className={item._id===expandedTaskId?'task-bubble-inner task-expanded':'task-bubble-inner task-collapsed'}>
                <img className='icon-image' 
                  src={urlFor(iconData?.filter(
                    (icon)=> taskTypes?.filter(
                          (taskType) => taskType._id === item?.taskType?._ref
                        )[0]?.icon?._ref===icon?._id
                      )[0]?.image?.asset?._ref)} 
                    alt='loading' 
                  />
                <div className='task-text'>
                  <div>
                    <h1>{taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.name}</h1>
                    <p>{item.amount} ({taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.unit})</p>
                  </div>
                  {item.notes && <p>{item.notes}</p>}
                </div>
              </div>
            </button>
            {item._id===expandedTaskId && 
              <button className='button-task-edit' type='button' onClick={(()=> {
                    if(!isDemo) navigate(`/add/day/${item._id}/${item.date}/${item.taskType._ref}/${item.amount}/${item.notes}`)
                  }
                )}>
              <AiOutlineEdit />
            </button>}
            {item._id===expandedTaskId && 
              <button className='button-task-duplicate' type='button' onClick={(()=>{
                    if(!isDemo) navigate(`/add/day/duplicate/${item.date}/${item.taskType._ref}/${item.amount}/${item.notes}`)
                  }
                )}>
              <IoCopyOutline />
            </button>}
          </div>
        )
    )
  }
  
  return (
    <div className='day-main'>
      {
        !isDemo &&
        <div className='home-header'>
          <button type='button' onClick={()=>{setDate((prev)=>new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()-1))}}>
            <BiSkipPrevious />
          </button>
          <h1>{date.toLocaleDateString()}</h1>
          <button type='button' onClick={()=>{setDate((prev)=>new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()+1))}}>
            <BiSkipNext />
          </button>
        </div>
      }
      {taskList(displayedTasks)}
    </div>
  )
}

export default Day