
import { useEffect, useState } from 'react';
import { v4 as uuid} from 'uuid'
import './App.css';

function App() {

  const [writeWish , setWriteWish] = useState("");
  const [addWishlists , setaddWishlist] = useState([])
  const searchHandler = (e) => {
     setWriteWish(e.target.value)
  }

  const addWishlist = () =>{
    if(writeWish){
     setaddWishlist([...addWishlists , {wishName : writeWish , id: uuid(), isCompleted:false}])
    }
   
    setWriteWish("");
  }


  const removeWishlist = (id) =>{
    const updateList = addWishlists.filter(items => items.id !== id)
    setaddWishlist(updateList)
  }

  const onCheckItem = (id) => {
    const completeWish = addWishlists.map(items => items.id === id ? {...items , isCompleted : !items.isCompleted} : items)
    setaddWishlist(completeWish)
  }

  useEffect(() => {
  console.log(addWishlists); // logs every time the array updates
}, [addWishlists]);


 




  return (
    <div className="App">
      <h1>Welcome to your wishlist</h1>
      <div className="wishlist-wrapper">
          <div className="add-box">
              <input value={writeWish} onChange={searchHandler}  onKeyDown={e => {
                if (e.key === 'Enter' && writeWish.trim()) addWishlist();
                }} type="text" placeholder='Enter your wish' />
              <button  onClick={addWishlist}  disabled={!writeWish.trim()}>Add</button>
          </div>

          <ul className='wishlists'>
            {
              addWishlists.map(items => <li key={items.id}>
                    <input
                      id={`wish-${items.id}`}
                      type="checkbox"
                      checked={items.isCompleted}
                      onChange={() => onCheckItem(items.id)}
                    />
                  <label htmlFor={`wish-${items.id}`} className={items.isCompleted ? "checked" : ""}>
                    {items.wishName}
                  </label>
                  <button  id={items.id} onClick={() =>removeWishlist(items.id)}>Del</button>
              </li>
              )
            }
             
          </ul>
      </div>
    </div>
  );
}

export default App;
