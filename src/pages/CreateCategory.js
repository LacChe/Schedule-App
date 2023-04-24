import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CreateCategory = () => {
    const navigate = useNavigate();

    const { id, name, hex, iconref } = useParams();

    const { userData, setCategories, iconData } = useStateContext();

    const [categoryName, setCategoryName] = useState(name);
    const [categoryColor, setCategoryColor] = useState(hex ? `#${hex}` : '#888888');
    const [categoryIcon, setCategoryIcon] = useState(iconData?.filter((item) => item._id===iconref)[0]);

    const submit = () => {
        if(!categoryName){
            toast.error('Please input a name.');
            return;
        }
        if(!categoryColor){
            toast.error('Please choose a color.');
            return;
        }
        if(!categoryIcon){
            toast.error('Please choose an icon.');
            return;
        }
        toast.success('Success!');
        if(!id){
          const doc = {
            _type: 'category',
            name: categoryName,
            user: {
                _type: 'reference',
                _ref: `${userData[0]._id}`
            },
            color: {
                _type: "color",
                hex: `${categoryColor}`
            },
            icon: {
                _type: 'reference',
                _ref: `${categoryIcon._id}`
              }
          }
          client.create(doc)
          .then((res) => {
            setCategories((prev) => [res].concat(prev));
          })
        } else {
            const doc = {
              _id: id,
              _type: 'category',
              name: categoryName,
              user: {
                  _type: 'reference',
                  _ref: `${userData[0]._id}`
              },
              color: {
                  _type: "color",
                  hex: `${categoryColor}`
              },
              icon: {
                  _type: 'reference',
                  _ref: `${categoryIcon._id}`
                }
            }
            client.createOrReplace(doc)
            .then((res) => {
              setCategories((prev) => prev.map((item) => item._id === res._id ? res : item));
            })
        }
        navigate('/profile');
    }
    
  return (
    <div className='create-item-main'>
        <h1>Create a Category</h1>
        <div className='create-item-text-input'>
            <p>Name:</p>
            <input type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}></input>
        </div>
        <div className='create-item-color-input'>
            <p>Choose a Color:</p>
            <input type='color' value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)}></input>
        </div>
        <div className='create-item-icon-list'>
            <p>Choose a Default Icon:</p>
            {iconData?.map((item) => 
                <button style={{'backgroundColor' : `${categoryColor}`}} key={item._id} type='button' onClick={() => {setCategoryIcon(item)}}>
                    <img className='icon-image' src={urlFor(item.image)} alt='icon' />
                </button>
            )}
        </div>
        <div className='profile-item-bubble-inner' style={{'backgroundColor' : `${categoryColor}`}}>
            {categoryIcon && <img className='icon-image' src={urlFor(categoryIcon.image.asset._ref)} alt='category' />}
            <p>{categoryName}</p>
        </div>
        <button className='create-confirm-button' type='button' onClick={submit}>Confirm</button>
    </div>
  )
}

export default CreateCategory