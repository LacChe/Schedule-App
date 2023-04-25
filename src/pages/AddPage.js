import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const AddPage = () => {
    const { userData, categories, systemCategories, taskTypes, setTasks, tasks } = useStateContext();
    const { returnPage, id, dateParam, taskParam, amountParam, notesParam } = useParams();

    const [date, setDate] = useState(dateParam ? dateParam : new Date());
    const [taskType, setTaskType] = useState(taskTypes?.filter((item) => item._id === taskParam)[0]);
    const [amount, setAmount] = useState(amountParam ? amountParam : 1);
    const [notes, setNotes] = useState(notesParam);

    const navigate = useNavigate();
    
    const submit = () => {
        if(!date){
            toast.error('Please input a Date.');
            return;
        }
        if(!taskType){
            toast.error('Please choose a Task.');
            return;
        }
        if(!amount || isNaN(amount)){
            toast.error('Please input a number for Amount.');
            return;
        }
        toast.success('Success!');
        if(!id){
          const doc = {
              _id: uuidv4(),
              _type: 'task',
              date: JSON.stringify(date).split('T')[0].substring(1),
              amount: Number(amount),
              notes: notes,
              user: {
                  _type: 'reference',
                  _ref: `${userData[0]._id}`
              },
              taskType: {
                  _type: 'reference',
                  _ref: `${taskType._id}`
              }
            }
            client.create(doc)
            localStorage.setItem('tasks', JSON.stringify([doc].concat(tasks)));
            setTasks((prev) => [doc].concat(prev));
        } else {
          const doc = {
            _id: id,
            _type: 'task',
            date: JSON.stringify(date).split('T')[0].substring(1),
            amount: Number(amount),
            notes: notes,
            user: {
                _type: 'reference',
                _ref: `${userData[0]._id}`
            },
            taskType: {
                _type: 'reference',
                _ref: `${taskType._id}`
            }
          }
          client.createOrReplace(doc);
          localStorage.setItem('tasks', JSON.stringify(tasks.map((item) => item._id === doc._id ? doc : item)));
          setTasks((prev) => prev.map((item) => item._id === doc._id ? doc : item));
        }
        navigate(returnPage ? `/${returnPage}` : '/');
    }

    return (
        <div className='create-item-main'>
            <h1>Add</h1>
            <div className='create-item-text-input'>
                <p>Date:</p>
                <input type='date' value={new Date(date)?.toLocaleDateString('en-CA')} onChange={(e) => setDate(e.target.value)}></input>
            </div>
            <div className='create-item-text-input amount-input'>
                <p>Amount:</p>
                <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)}></input>
            </div>
            <div className='create-item-button-list'>
                <p>Choose a Task:</p>
                {!taskTypes ? 
                <div className='empty-tasks'> 
                    <button className='create-task-redirect-button' type='button' onClick={() => navigate('/task')}>Nothing here.<br/>Create a Task.</button>
                </div> 
                : 
                taskTypes?.map((item) => 
                    <button className='item-bubble-inner' style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((cat) => cat?._id === item?.category?._id)[0]?.color.hex}} key={item._id} type='button' onClick={() => {setTaskType(item)}}>
                        {urlFor(item.icon.image)!=='' ? 
                            <img className='icon-image' src={urlFor(item.icon.image)} alt='loading' /> : 
                            <AiOutlineWarning />
                        }
                        <p>{item.name} ({item.unit})</p>
                    </button>
                )}
            </div>
            <div className='notes-input'>
                <p>Notes:</p>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </div>
            <div className='item-bubble-inner' style={{'backgroundColor' : taskType ? categories?.concat(systemCategories)?.filter((item) => item?._id === taskType?.category?._id)[0]?.color.hex : '#666666' }}>
                {taskType && <img className='icon-image' src={urlFor(taskType?.icon?.image)} alt='task' />}
                <p>{taskType ? taskType.name : 'Name'} ({amount} {taskType ? taskType.unit : 'Unit'})</p>
            </div>
            <button className='create-confirm-button' type='button' onClick={submit}>Confirm</button>
        </div>
    )
}

export default AddPage