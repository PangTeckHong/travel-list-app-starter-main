import { useState } from "react";

export default function Form({onAddItem}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("1");
    
    function handleSubmit(e) {
      e.preventDefault();
  
      if (!description) {alert("Input cannot be empty!\n\nPlese type in something."); return;} // To prevent empty items added to the list
  
      const newItem = {
        id: Date.now(),
        description,
        quantity,
        packed: false
      }
      console.log("Item:", description, "Quantity:", quantity);
      console.log("New item:", newItem);
  
      //This is for reset the form after submit
      setDescription("");
      setQuantity("1");
      //~
  
      onAddItem(newItem);
    }
  
  
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need to pack?</h3>
        <select
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
  
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
  
        <button>Add</button>
      </form>
    );
  }
  