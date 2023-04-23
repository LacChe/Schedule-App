import React, { useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { client, urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CreateCategory = () => {
    const navigate = useNavigate();

    const { id, name, hex, iconref } = useParams();

    const { userData, setCategories, iconData } = useStateContext();

    const [categoryName, setCategoryName] = useState(name);
    const [categoryColor, setCategoryColor] = useState(`#${hex}`);
    const [categoryIcon, setCategoryIcon] = useState(iconData.filter((item) => item._id===iconref)[0]);

    const [errorText, setErrorText] = useState('');

    const submit = () => {
        if(!categoryName){
            setErrorText('Please input a name.');
            return;
        }
        if(!categoryColor){
            setErrorText('Please choose a color.');
            return;
        }
        if(!categoryIcon){
            setErrorText('Please choose an icon.');
            return;
        }
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
            navigate('/profile');
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
              navigate('/profile');
            })
        }
    }
    
  return (
    <div>
        <h1>Create a Category</h1>
        <input type='text' value={categoryName} onChange={(e) => setCategoryName(e.target.value)}></input>
        <input type='color' value={categoryColor} onChange={(e) => setCategoryColor(e.target.value)}></input>
        {iconData?.map((item) => 
            <button key={item._id} type='button' onClick={() => {setCategoryIcon(item)}}>
                <img style={{'width': '32px', 'backgroundColor' : `${categoryColor}`}} src={urlFor(item.image)} alt='icon' />
            </button>
        )}
        <div style={{'display' : 'flex', 'alignItems' : 'center', 'borderRadius': '20px', 'backgroundColor' : `${categoryColor}`, 'color' : `white`, 'padding': '5px', 'margin': '5px', 'width': 'fit-content', 'height': '40px'}}>
        {categoryIcon && <img style={{'marginRight': '5px', "height" : '32px', "width" : '32px'}} src={urlFor(categoryIcon.image.asset._ref)} alt='category' />}
            <p>{categoryName}</p>
        </div>
        <button type='button' onClick={submit}>Confirm</button>
        <p>{errorText}</p>
    </div>
  )
}

export default CreateCategory