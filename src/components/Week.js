import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { urlFor } from '../utils/client.js';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

const Week = () => {
  const navigate = useNavigate();
  
  const { searchTerm, idFilters, tasks, taskTypes, categories, systemCategories, iconData, endDate, setEndDate } = useStateContext();
  const { dateParam } = useParams();

  const [displayedTasks, setDisplayedTasks] = useState();

  let startDate = useRef();

  useEffect(() => {
    if(dateParam) {
      setEndDate(new Date(dateParam.split('-')[0], dateParam.split('-')[1]-1, dateParam.split('-')[2]));
    }
  }, [])

  useEffect(() => {
    startDate.current = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-6)
  }, [endDate])
  
  

  const filterAndSearchTasks = () => {
    if(!tasks) return [];
    let tempTasks = tasks;

    // filter by date
    tempTasks = tempTasks.filter((item) => {
      const tempDate = new Date(item.date);
      const bool = (startDate.current?.getFullYear() === tempDate.getFullYear() || endDate.getFullYear() === tempDate.getFullYear()) &&
        (startDate.current?.getMonth() === tempDate.getMonth() || endDate.getMonth() === tempDate.getMonth()) &&
        (startDate.current?.getDate() <= tempDate.getDate() && endDate.getDate() >= tempDate.getDate());
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

    // sort by day
    let tempTasksGroup = [];
    tempTasksGroup[0] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-6).getDate()
    )
    tempTasksGroup[1] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-5).getDate()
    )
    tempTasksGroup[2] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-4).getDate()
    )
    tempTasksGroup[3] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-3).getDate()
    )
    tempTasksGroup[4] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-2).getDate()
    )
    tempTasksGroup[5] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()-1).getDate()
    )
    tempTasksGroup[6] = tempTasks.filter((item) => 
      new Date(item.date.split('-')[0], item.date.split('-')[1], item.date.split('-')[2]).getDate() === endDate.getDate()
    )

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
  }, [tasks, startDate.current, endDate, searchTerm, idFilters])

  const taskList = (obj) => {
    const objKeys = Object.keys(obj);
    if(objKeys?.length === 0) return <div className='empty-week'></div>

    let jsxArray = [];
      
      objKeys.forEach(function(key, index) {
        jsxArray[index] = (
          <div className='task-wrapper'>
            <button className='button-task-bubble' onClick={()=>{
                navigate(`/day/${obj[key].date}`);
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
          setEndDate((prev)=>new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()-7))
        }}>
          <BiSkipPrevious />
        </button>
        <h1>{startDate.current?.toLocaleDateString()} ~ {new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).toLocaleDateString()}</h1>
        <button type='button' onClick={()=>{
          setEndDate((prev)=>new Date(prev.getFullYear(), prev.getMonth(), prev.getDate()+7))
        }}>
          <BiSkipNext />
        </button>
      </div>
      <div className='week-task-list'>
        {displayedTasks?.map((dailyTasks, index) => {
          return (
            <div key={index}>
              <h1>{
                new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+index).getDate()
              }</h1>
              {taskList(dailyTasks)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Week