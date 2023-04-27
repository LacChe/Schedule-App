import React, { useEffect, useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { urlFor } from '../utils/client.js';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

const Month = () => {
  const navigate = useNavigate();
  
  const { searchTerm, idFilters, tasks, taskTypes, categories, systemCategories, iconData, endDate, setEndDate } = useStateContext();
  const { dateParam } = useParams();

  const [displayedTasks, setDisplayedTasks] = useState();

  const monthsArray = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'
  ];

  useEffect(() => {
    if(dateParam) {
      setEndDate(new Date(dateParam.split('-')[0], dateParam.split('-')[1]-1));
    }
  })  

  const filterAndSearchTasks = () => {
    if(!tasks) return [];
    let tempTasks = tasks;

    // filter by date
    tempTasks = tempTasks.filter((item) => {
      const tempDate = new Date(item.date);
      const bool = (endDate.getFullYear() === tempDate.getFullYear()) &&
        (endDate.getMonth() === tempDate.getMonth());
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

    // sort by week
    let tempTasksGroup = [];
    tempTasksGroup[0] = tempTasks.filter((item) => 
      item.date.split('-')[2] <= 7
    )
    tempTasksGroup[1] = tempTasks.filter((item) => 
      item.date.split('-')[2] > 7 && item.date.split('-')[2] <= 14
    )
    tempTasksGroup[2] = tempTasks.filter((item) => 
      item.date.split('-')[2] > 14 && item.date.split('-')[2] <= 21
    )
    tempTasksGroup[3] = tempTasks.filter((item) => 
      item.date.split('-')[2] > 21 && item.date.split('-')[2] <= 28
    )
    if(new Date(endDate.getFullYear(), endDate.getMonth()+1, 0).getDate() > 28) {
      tempTasksGroup[4] = tempTasks.filter((item) => 
        item.date.split('-')[2] > 28
      )
    }

    // combine same task types
    let tempTasksGroupByTasks = [];
    for(let i = 0; i < tempTasksGroup.length; i++){
      tempTasksGroupByTasks[i] = {};
      for(let j = 0; j < tempTasksGroup[i].length; j++){
        const prevAmt = tempTasksGroupByTasks[i][tempTasksGroup[i][j]?.taskType._ref]?.amount;
        tempTasksGroupByTasks[i][tempTasksGroup[i][j]?.taskType._ref] = {
          taskTypeId: tempTasksGroup[i][j]?.taskType._ref,
          amount: prevAmt ? tempTasksGroup[i][j].amount + prevAmt : tempTasksGroup[i][j].amount,
          iconId: iconData?.filter((icon)=> taskTypes?.filter((taskType) => taskType._id === tempTasksGroup[i][j]?.taskType._ref)[0]?.icon?._ref===icon?._id)[0]?.image?.asset?._ref,
          date: tempTasksGroup[i][j].date
        }
      }
    }

    setDisplayedTasks(tempTasksGroupByTasks);
  }

  useEffect(() => {
    filterAndSearchTasks();
  }, [tasks, endDate, searchTerm, idFilters])

  const taskList = (obj) => {
    const objKeys = Object.keys(obj);
    if(objKeys?.length === 0) return <div className='empty-week'></div>

    let jsxArray = [];
      
      objKeys.forEach(function(key, index) {
        jsxArray[index] = (
          <div className='task-wrapper'>
            <button className='button-task-bubble' onClick={()=>{
                navigate(`/week/${obj[key].date}`);
              }} style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((cat) => cat?._id === taskTypes?.filter((taskType) => taskType._id === obj[key].taskTypeId)[0]?.category?._ref)[0]?.color.hex}}>
              <div style={{
                'height':window.screen.width > 1024 ? `${20+15*obj[key].amount}px` : `${7+4*obj[key].amount}vw`
                }} className='task-bubble-inner-week'>
                <img className='icon-image' src={urlFor(iconData?.filter((icon)=> taskTypes?.filter((taskType) => taskType._id === obj[key].taskTypeId)[0]?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} alt='loading' />
              </div>
            </button>
          </div>
        )
      });
      return jsxArray;
  }

  return (
    <div className='day-main'>
      <div className='home-header'>
        <button type='button' onClick={()=>{
          setEndDate((prev)=>new Date(prev.getFullYear(), prev.getMonth()-1))
        }}>
          <BiSkipPrevious />
        </button>
        <h1>{monthsArray[endDate.getMonth()]} {endDate.getFullYear()}</h1>
        <button type='button' onClick={()=>{
          setEndDate((prev)=>new Date(prev.getFullYear(), prev.getMonth()+1))
        }}>
          <BiSkipNext />
        </button>
      </div>
      <div className='week-task-list'>
        {displayedTasks?.map((weeklyTasks, index) => {
          return (
            <div key={index}>
              <h1>{
                index*7+1
              }</h1>
              {taskList(weeklyTasks)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Month