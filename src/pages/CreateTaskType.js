import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CreateTaskType = () => {

    const navigate = useNavigate();

    const { id, name, unit, categoryref, iconref } = useParams();

    const { userData, categories, setTaskTypes, iconData } = useStateContext();

    const [taskName, setTaskName] = useState(name);
    const [taskUnit, setTaskUnit] = useState(unit);
    const [taskCategory, setTaskCategory] = useState(categories?.filter((item) => item._id===categoryref)[0]);
    const [taskIcon, setTaskIcon] = useState(iconData?.filter((item) => item._id===iconref)[0]);

    const [errorText, setErrorText] = useState('');

    const submit = () => {
        if(!taskName){
            setErrorText('Please input a name.');
            return;
        }
        if(!taskUnit){
            setErrorText('Please input a unit type.');
            return;
        }
        if(!taskCategory){
            setErrorText('Please choose a category.');
            return;
        }
        if(!id){
          const doc = {
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
            client.create(doc)
            .then((res) => {
              setTaskTypes((prev) => [res].concat(prev));
              navigate('/profile');
            })
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
          .then((res) => {
            setTaskTypes((prev) => prev.map((item) => item._id === res._id ? res : item));
            navigate('/profile');
          })
        }
    }
    
  return (
    <div>
        <h1>Create a Task</h1>
        <input type='text' value={taskName} onChange={(e) => setTaskName(e.target.value)}></input>
        <input type='text' value={taskUnit} onChange={(e) => setTaskUnit(e.target.value)}></input>
        {categories?.map((item) => 
            <button key={item._id} type='button' onClick={() => {setTaskCategory(item)}}>
              <img style={{'width': '32px', 'backgroundColor' : `${item.color.hex}`}} src={urlFor(item.icon.image)} alt='icon' />
              <p>{item.name}</p>
            </button>
        )}
        {iconData?.map((item) => 
            <button key={item._id} type='button' onClick={() => {setTaskIcon(item)}}>
                <img style={{'width': '32px', 'backgroundColor' : taskCategory?`${taskCategory.color.hex}`:'#000000'}} src={urlFor(item.image)} alt='icon' />
            </button>
        )}
        <div style={{'display' : 'flex', 'alignItems' : 'center', 'borderRadius': '20px', 'backgroundColor' : `${taskCategory?.color.hex}`, 'color' : `white`, 'padding': '5px', 'margin': '5px', 'width': 'fit-content', 'height': '40px'}}>
            {taskCategory && <img style={{'marginRight': '5px', "height" : '32px', "width" : '32px'}} src={urlFor(taskIcon ? taskIcon?.image?.asset?._ref : taskCategory?.icon?.image?.asset?._ref)} alt='task' />}
            <p>{taskName ? taskName : 'Name'} ({taskUnit ? taskUnit : 'Unit'})</p>
        </div>
        <button type='button' onClick={submit}>Confirm</button>
        <p>{errorText}</p>
    </div>
  )
}

export default CreateTaskType