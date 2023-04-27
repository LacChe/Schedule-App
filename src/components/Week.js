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
    setDisplayedTasks(tempTasks);
  }

  useEffect(() => {
    filterAndSearchTasks();
  }, [tasks, startDate.current, endDate, searchTerm, idFilters])

  const taskList = (arr) => {
    return(
      arr?.length === 0 ? <div className='empty-week'>E</div> : arr?.map((item) => 
        <div className='task-wrapper' key={item._id}>
          <button className='button-task-bubble' onClick={()=>{
            const dateString = item.date.includes('T') ? JSON.stringify(item.date).split('T')[0].substring(1) : item.date;
              navigate(`/day/${dateString}`);
            }} style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((cat) => cat?._id === taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.category?._ref)[0]?.color.hex}}>
            <div className='task-bubble-inner-week'>
              <img className='icon-image' src={urlFor(iconData?.filter((icon)=> taskTypes?.filter((taskType) => taskType._id === item?.taskType?._ref)[0]?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} alt='loading' />
            </div>
          </button>
        </div>
      )
    )
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
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()).getDate()
          }</h1>
            {taskList(displayedTasks?.filter((item) => {
              const tempDate = new Date(item.date);
              return startDate.current?.getDate() === tempDate.getDate();
            }))}
        </div>
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+1).getDate()
          }</h1>
          {taskList(displayedTasks?.filter((item) => {
            const tempDate = new Date(item.date);
            return startDate.current?.getDate()+1 === tempDate.getDate();
          }))}
        </div>
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+2).getDate()
          }</h1>
          {taskList(displayedTasks?.filter((item) => {
            const tempDate = new Date(item.date);
            return startDate.current?.getDate()+2 === tempDate.getDate();
          }))}
        </div>
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+3).getDate()
          }</h1>
          {taskList(displayedTasks?.filter((item) => {
            const tempDate = new Date(item.date);
            return startDate.current?.getDate()+3 === tempDate.getDate();
          }))}
        </div>
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+4).getDate()
          }</h1>
          {taskList(displayedTasks?.filter((item) => {
            const tempDate = new Date(item.date);
            return startDate.current?.getDate()+4 === tempDate.getDate();
          }))}
        </div>
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+5).getDate()
          }</h1>
          {taskList(displayedTasks?.filter((item) => {
            const tempDate = new Date(item.date);
            return startDate.current?.getDate()+5 === tempDate.getDate();
          }))}
        </div>
        <div>
          <h1>{
            new Date(startDate.current?.getFullYear(), startDate.current?.getMonth(), startDate.current?.getDate()+6).getDate()
          }</h1>
          {taskList(displayedTasks?.filter((item) => {
            const tempDate = new Date(item.date);
            return startDate.current?.getDate()+6 === tempDate.getDate();
          }))}
        </div>
      </div>
    </div>
  )
}

export default Week