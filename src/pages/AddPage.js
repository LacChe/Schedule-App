import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { AiOutlineWarning } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddPage = () => {
    const { userData, categories, systemCategories, taskTypes, setTasks} = useStateContext();
    const { returnPage, id, dateParam, taskParam, amountParam, notesParam } = useParams();

    const [date, setDate] = useState(dateParam ? dateParam : new Date());
    const [task, setTask] = useState(taskTypes?.filter((taskType) => taskType._id === taskParam)[0]);
    const [amount, setAmount] = useState(amountParam ? amountParam : 1);
    const [notes, setNotes] = useState(notesParam);

    const navigate = useNavigate();
    
    const submit = () => {
        if(!date){
            toast.error('Please input a Date.');
            return;
        }
        if(!task){
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
              _type: 'task',
              date: date.split('T')[0],
              amount: Number(amount),
              notes: notes,
              user: {
                  _type: 'reference',
                  _ref: `${userData[0]._id}`
              },
              taskType: {
                  _type: 'reference',
                  _ref: `${task._id}`
              }
            }
            client.create(doc)
            .then((res) => {
                setTasks((prev) => [res].concat(prev));
            })
        } else {
          const doc = {
            _id: id,
            _type: 'task',
            date: date.split('T')[0],
            amount: Number(amount),
            notes: notes,
            user: {
                _type: 'reference',
                _ref: `${userData[0]._id}`
            },
            taskType: {
                _type: 'reference',
                _ref: `${task._id}`
            }
          }
          client.createOrReplace(doc)
          .then((res) => {
            setTasks((prev) => prev.map((item) => item._id === res._id ? res : item));
          })
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
                {taskTypes?.map((item) => 
                    <button className='item-bubble-inner' style={{'backgroundColor' : categories?.concat(systemCategories)?.filter((cat) => cat?._id === item?.category?._id)[0]?.color.hex}} key={item._id} type='button' onClick={() => {setTask(item)}}>
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
            <div className='item-bubble-inner' style={{'backgroundColor' : task ? categories?.concat(systemCategories)?.filter((item) => item?._id === task?.category?._id)[0]?.color.hex : '#666666' }}>
                {task && <img className='icon-image' src={urlFor(task?.icon?.image)} alt='task' />}
                <p>{task ? task.name : 'Name'} ({amount} {task ? task.unit : 'Unit'})</p>
            </div>
            <button className='create-confirm-button' type='button' onClick={submit}>Confirm</button>
        </div>
    )
}

export default AddPage