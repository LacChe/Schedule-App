import React, { useEffect, useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';

const All = () => {
  const navigate = useNavigate();
  
  const { searchTerm, idFilters, tasks, taskTypes, categories, systemCategories, iconData } = useStateContext();

  const [displayedTasks, setDisplayedTasks] = useState()
  const [expandedTaskId, setExpandedTaskId] = useState()

  const filterAndSearchTasks = () => {
    if(!tasks) return [];
    let tempTasks = tasks;

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
  }, [tasks, searchTerm, idFilters])
  
  const taskList = (arr) => {
    let reversedArr = arr ? arr.slice().reverse() : [];
    let prevDate = undefined;
    let currentDate = undefined;
    return(
      reversedArr?.length === 0 ? <div className='empty'>Empty</div> : reversedArr?.map((item) => 
        {
            prevDate = currentDate;
            currentDate = item.date;
            return(
                <div className='date-wrapper' key={item._id}>
                    {(!prevDate || 
                        (
                          Number(prevDate.split('-')[0]) !== Number(item.date.split('-')[0]) ||
                          Number(prevDate.split('-')[1]) !== Number(item.date.split('-')[1]) ||
                          Number(prevDate.split('-')[2]) !== Number(item.date.split('-')[2])
                        )
                      ) && <h1 className='all-header'>{item.date}</h1>}
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
                          src={urlFor(iconData?.filter((icon)=> taskTypes?.filter(
                              (taskType) => taskType._id === item?.taskType?._ref
                            )[0]?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} 
                          alt='loading' 
                        />
                        <div className='task-text'>
                            <div>
                              <h1>{taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.name}</h1>
                              <p>{item.amount} ({taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.unit})</p>
                            </div>
                            {item.notes && (
                              item._id!==expandedTaskId?
                              <p>{item.notes.substring(0,18)}{item.notes.length > 18 && '...'}</p> : 
                              <p>{item.notes}</p>
                            )}
                        </div>
                      </div>
                    </button>
                    {item._id===expandedTaskId && 
                        <button className='button-task-edit' type='button' onClick={(()=>
                          navigate(`/add/day/${item._id}/${item.date}/${item.taskType._ref}/${item.amount}/${item.notes}`)
                        )}>
                        <AiOutlineEdit />
                    </button>}
                    {item._id===expandedTaskId && 
                        <button className='button-task-duplicate' type='button' onClick={(()=>
                          navigate(`/add/day/duplicate/${item.date}/${item.taskType._ref}/${item.amount}/${item.notes}`)
                        )}>
                        <IoCopyOutline />
                    </button>}
                  </div>
              </div>
            )
        }
      )
    )
  }
  
  return (
    <div className='day-main'>
      <div className='all-title'>
        <h1>Everything</h1>
      </div>
      {taskList(displayedTasks)}
    </div>
  )
}

export default All