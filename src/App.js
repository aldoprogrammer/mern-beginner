import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
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
    console.log(item);
  }

  function addItem(e){
    e.preventDefault();
    const newItem = {
      title: item.title,
      description: item.description
    }
    axios.post('/newItem', newItem)
    console.log(newItem);

  }
  return (
    <div className="App">
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
  );
}

export default App;
