import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { AiFillDelete, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { BsBackspaceFill } from 'react-icons/bs';

const AddPage = () => {
    const { userData, categories, systemCategories, taskTypes, setTasks, tasks, iconData } = useStateContext();
    const { returnPage, id, dateParam, taskParam, amountParam, notesParam } = useParams();

    const [date, setDate] = useState(
        dateParam ? dateParam : `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    );
    const [taskType, setTaskType] = useState(taskTypes?.filter((item) => item._id === taskParam)[0]);
    const [amount, setAmount] = useState(amountParam ? amountParam : undefined);
    const [notes, setNotes] = useState(notesParam ? notesParam : '');
    const [deleteStatus, setDeleteStatus] = useState('none')
    
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
              date: date,
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
            date: date,
            amount: Number(amount),
            notes: notes.replace('/', ' '),
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
        navigate(returnPage ? `/${returnPage}/${date}` : '/');
    }

    const deleteItem = () => {
        client.delete(id)
        .then(() => {
            localStorage.setItem('tasks', JSON.stringify(tasks.filter((item) => item._id !== id)));
            setTasks((prev) => prev.filter((item) => item._id !== id));
            navigate(returnPage ? `/${returnPage}` : '/');
        })
        .catch(() => {
          toast.error('Make sure this isn\'t used anywhere.');
        })
    }

    const onDelete = () => {
      switch (deleteStatus) {
        case 'none':
          setDeleteStatus('confirm');
          break;
        case 'confirm':
          deleteItem();
          setDeleteStatus('none');
          break;
        default:
          setDeleteStatus('none');
          break;
      }
    }

    return (
        <div className='create-item-main'>
            <h1>Add</h1>
            <div className='create-item-text-input'>
                <p>Date:</p>
                <input type='date' 
                    value={new Date(date).toLocaleDateString('en-CA')} 
                    onChange={(e) => setDate(e.target.value)}
                ></input>
            </div>
            <div className='create-item-text-input amount-input'>
                <p>Amount:</p>
                <input type='text' value={amount} onChange={(e) => setAmount(e.target.value)}></input>
            </div>
            <div className='create-item-button-list'>
                <p>Choose a Task:</p>
                {!taskTypes || taskTypes.length===0 ? 
                <div className='empty-tasks'> 
                    <button className='create-task-redirect-button' 
                        type='button' 
                        onClick={() => navigate('/task')}
                    >
                        Nothing here.<br/>Create a Task.
                    </button>
                </div> 
                : 
                taskTypes?.map((item) => 
                    <button className='item-bubble-inner' 
                        style={{'backgroundColor' : categories?.concat(systemCategories)?.filter(
                            (cat) => cat?._id === item?.category?._ref)[0]?.color.hex}} 
                        key={item._id} 
                        type='button' 
                        onClick={() => {setTaskType(item)}}
                    >
                        <img className='icon-image' 
                            src={urlFor(iconData?.filter((icon)=>item?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} 
                            alt='loading' 
                        />
                        <p>{item.name} {item.unit}</p>
                    </button>
                )}
            </div>
            <div className='notes-input'>
                <p>Notes:</p>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}/>
            </div>
            <div className='item-bubble-inner' 
                style={{'backgroundColor' : taskType ? categories?.concat(systemCategories)?.filter(
                    (item) => item?._id === taskType?.category?._ref)[0]?.color.hex : '#666666'}}
            >
                {taskType && 
                    <img className='icon-image' 
                        src={urlFor(iconData?.filter((icon)=>taskType?.icon?._ref===icon?._id)[0]?.image?.asset?._ref)} 
                        alt='loading' 
                    />
                }
                <div className='task-text'>
                    <div>
                        <h1>{taskType?.name}</h1>
                        <p>{amount} {taskType?.unit}</p>
                    </div>
                    {notes && <p>{notes.substring(0,18)}{notes.length > 18 && '...'}</p>}
                </div>
              </div>
            {id && (deleteStatus === 'confirm' ?       
                <div className='profile-item-bubble'>
                    <button className='button-delete-back' 
                        type='button' 
                        onClick={() => {setDeleteStatus('none')}}
                    >
                        <BsBackspaceFill />
                    </button>
                    <div className='add-item-delete' >
                        <p>Delete?</p>
                    </div>
                    <button className='button-delete-confirm' 
                        type='button' 
                        onClick={() => onDelete()}
                    >
                        <AiFillDelete />
                    </button>
                </div>
                :
                <div className='add-with-delete'>
                    <button className='button-delete' 
                        type='button' 
                        onClick={() => {setDeleteStatus('confirm')}}
                    >
                        <AiOutlineDelete />
                    </button>
                    <button className='create-confirm-button' type='button' onClick={submit}>Confirm</button>
                </div>
            )}
            {!id && <button className='create-confirm-button' type='button' onClick={submit}>Confirm</button>}
        </div>
    )
}

export default AddPage