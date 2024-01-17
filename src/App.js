import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [item, setItem] = useState({
    title: '',
    description: ''
  })

  function handleChange(e){
    const {name, value} = e.target;
    setItem((prevInput) => {
      return (
        {
          ...prevInput,
          [name]: value  
        }
      )
    })
  }

  function addItem(e){
    e.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description
    }
    axios.post('/newItem', newItem)
    console.log(newItem);
    alert("Item added successfully")
    setItem({
      title: '',
      description: ''
    })
  }

  const [items, setItems] = useState([
    {
      title: '',
      description: '',
      _id: ''
    }
  ])

  useEffect(() =>{
    fetch('/items')
    .then((res) => {
      if(res.ok) {
        return res.json()
      }
    })
    .then(jsonRes => setItems(jsonRes))
    .catch(err => console.error(err))
  }, [items])
  return (
    <div className="App">
      <div className='main'>
      <input 
       onChange={handleChange} 
       name='title' 
       placeholder='title'
       value={item.title} 
       ></input>
      <input 
       onChange={handleChange} 
       name='description' 
       placeholder='description'
       value={item.description} 
       ></input>
       <button
        onClick={addItem}
       >Add Item</button>
       </div>
       {
        items.map(item => {
          return (
            <div key={item._id} style={{background: 'pink', width: '40%', margin: 'auto auto'}}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <button>Delete</button>
            <button>Update</button>
            </div>
          )
        })
       }
    </div>
  );
}

export default App;
