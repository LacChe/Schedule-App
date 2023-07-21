import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Grid } from  'react-loader-spinner'

const CreateTaskType = () => {

    const navigate = useNavigate();

    const { id, name, unit, categoryref, iconref } = useParams();
    const { loaded, userData, categories, systemCategories, setTaskTypes, taskTypes, iconData } = useStateContext();

    const [taskName, setTaskName] = useState(name);
    const [taskUnit, setTaskUnit] = useState(unit);
    const [taskCategory, setTaskCategory] = useState(
        categories?.concat(systemCategories)?.filter((item) => item?._id===categoryref)[0]
    );
    const [taskIcon, setTaskIcon] = useState(iconData?.filter((item) => item?._id===iconref)[0]);

    const submit = () => {
        if(!taskName){
            toast.error('Please input a name.');
            return;
        }
        if(!taskUnit){
            toast.error('Please input a unit type.');
            return;
        }
        if(!taskCategory){
            toast.error('Please choose a category.');
            return;
        }
        toast.success('Success!');
        if(!id){
          const doc = {
              _id: uuidv4(),
              _type: 'taskType',
              name: taskName,
              unit: taskUnit,
              user: {
                  _type: 'reference',
                  _ref: `${userData[0]._id}`
              },
              category: {
                  _type: 'reference',
                  _ref: `${taskCategory._id}`
              },
              icon: {
                  _type: 'reference',
                  _ref: `${taskIcon ? taskIcon._id : taskCategory.icon._ref}`
              }
            }
            client.create(doc)
            localStorage.setItem('task-types', JSON.stringify([doc].concat(taskTypes)));
            setTaskTypes((prev) => [doc].concat(prev));
        } else {
          const doc = {
            _id: id,
            _type: 'taskType',
            name: taskName,
            unit: taskUnit,
            user: {
                _type: 'reference',
                _ref: `${userData[0]._id}`
            },
            category: {
                _type: 'reference',
                _ref: `${taskCategory._id}`
            },
            icon: {
                _type: 'reference',
                _ref: `${taskIcon ? taskIcon._id : taskCategory.icon._id}`
            }
          }
          client.createOrReplace(doc)
          localStorage.setItem('task-types', JSON.stringify(taskTypes.map((item) => item._id === doc._id ? doc : item)));
          setTaskTypes((prev) => prev.map((item) => item._id === doc._id ? doc : item));
        }
        navigate('/profile');
    }
    
  if(!loaded()) {
    return (
        <div className='spinner'>
          <Grid
              height="80"
              width="80"
              color="#002B5B"
              ariaLabel="grid-loading"
              radius="12.5"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
          />
        </div>
    )
  }

  return (
    <div className='create-item-main'>
        <h1>Create a Task</h1>
        <div className='create-item-text-input'>
            <p>Name:</p>
            <input type='text' value={taskName} onChange={(e) => setTaskName(e.target.value)}></input>
        </div>
        <div className='create-item-text-input'>
            <p>Unit:</p>
            <input type='text' value={taskUnit} onChange={(e) => setTaskUnit(e.target.value)}></input>
        </div>
        <div className='create-item-button-list'>
            <p>Choose a Category:</p>
            {categories?.map((item) => 
                <button className='item-bubble-inner' 
                    style={{'backgroundColor' : `${item?.color?.hex}`}} 
                    key={item._id} 
                    type='button' 
                    onClick={() => {setTaskCategory(item)}}
                >
                    <img className='icon-image' 
                        src={urlFor(iconData?.filter((icon)=>item?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} 
                        alt='icon' 
                    />
                    <p>{item.name}</p>
                </button>
            )}
            {systemCategories?.map((item) => 
                <button className='item-bubble-inner' 
                    style={{'backgroundColor' : `${item?.color?.hex}`}} 
                    key={item._id} 
                    type='button' 
                    onClick={() => {setTaskCategory(item)}}
                >
                    <img className='icon-image' 
                        src={urlFor(iconData?.filter((icon)=>item?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} 
                        alt='icon' />
                    <p>{item.name}</p>
                </button>
            )}
        </div>
        <div className='create-item-icon-list'>
            <p>Use a Different Icon?</p>
            {iconData?.map((item) => 
                <button 
                    style={{'backgroundColor' : `${taskCategory?.color?.hex}`}} 
                    key={item._id} 
                    type='button' 
                    onClick={() => {setTaskIcon(item)}}
                >
                    <img className='icon-image' src={urlFor(item?.image)} alt='icon' />
                </button>
            )}
        </div>
        <div className='item-bubble-inner' 
            style={{'backgroundColor' : taskCategory ? `${taskCategory?.color?.hex}` : '#666666'}}
        >
            {taskCategory && 
                <img className='icon-image' 
                    alt='task' 
                    src={urlFor(iconData?.filter((icon)=>
                         (taskIcon ? taskIcon._id : taskCategory?.icon?._ref)===icon?._id)[0]?.image?.asset?._ref)
                        } 
                />
            }
            <p>{taskName ? taskName : 'Name'} ({taskUnit ? taskUnit : 'Unit'})</p>
        </div>
        <button className='create-confirm-button' type='button' onClick={submit}>Confirm</button>
    </div>
  )
}

export default CreateTaskType