import React, { useEffect, useState } from 'react'
import { useStateContext } from '../utils/stateContext.js';
import { iconQuery } from '../utils/data.js';
import { client, urlFor } from '../utils/client.js';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {

    const navigate = useNavigate();

    const { userData, categories, setCategories } = useStateContext();
    const [iconData, setIconData] = useState();

    const [categoryName, setCategoryName] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');
    const [categoryIcon, setCategoryIcon] = useState('');

    const [errorText, setErrorText] = useState('');

    // fetch icon data
    useEffect(() => {
      const query = iconQuery();
      client.fetch(query)
      .then((data) => {
        // console.log('iconQuery', JSON.stringify(data))
        setIconData(data);
      })
    }, [userData])

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
            console.log(JSON.stringify(categories))
            navigate('/profile');
          })
    }
    
  return (
    <div>
        <h1>Create a Category</h1>
        <input type='text' onChange={(e) => setCategoryName(e.target.value)}></input>
        <input type='color' onChange={(e) => setCategoryColor(e.target.value)}></input>
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