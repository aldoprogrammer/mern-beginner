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

  function deleteItem(id){
    axios.delete('/delete/'+id)
    alert(`delete item ${id}`)
  }

  const [isPut, setIsPut] = useState(false)
  const [updatedItem, setUpdatedItem] = useState({
    title: '',
    description: '',
    id: '',
  })

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        _id: id,
      };
    });
  }
  

  function updateItem(id) {
    axios.put('/put/'+id, updatedItem)
    alert('Item updated')
    console.log(`item with id ${id} updated`);
  }
  
  function handleUpdate(e) {
    const {name, value} = e.target;
    setUpdatedItem(prevInput => {
      return (
        {
          ...prevInput,
          [name]: value
        }
      )
    })
    console.log(updatedItem);
  }
  return (
    <div className="App">
      {!isPut ? 
      (
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
      ) : (<div className='main'>
      <input 
       onChange={handleUpdate} 
       name='title' 
       placeholder='title'
       value={updatedItem.title} 
       ></input>
      <input 
       onChange={handleUpdate} 
       name='description' 
       placeholder='description'
       value={updatedItem.description} 
       ></input>
       <button onClick={() => 
        openUpdate(updatedItem._id)}>Update</button>

       </div>
       )}
       {
        items.map(item => {
          return (
            <div key={item._id} style={{background: 'pink', width: '40%', margin: 'auto auto'}}>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
            <button onClick={() => openUpdate(updatedItem._id)}>Update</button>
            </div>
          )
        })
       }
    </div>
  );
}

export default App;
