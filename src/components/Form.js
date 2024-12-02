import { useState } from "react";

export default function Form({onAddItem}) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("1");
    const [isCustomQuantity, setIsCustomQuantity] = useState(false);
    const [customQuantity, setCustomQuantity] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();

      const finalQuantity = isCustomQuantity ? customQuantity : quantity;

      if (!description) {alert("Input cannot be empty!\n\nPlese type in something."); return;} // To prevent empty items added to the list
      
      if (isCustomQuantity && (!customQuantity || isNaN(customQuantity) || customQuantity <= 0)) {
        alert("Please enter a valid quantity.");
        return;
      }

      const newItem = {
        id: Date.now(),
        description,
        quantity: finalQuantity,
        packed: false
      }
      console.log("Item:", description, "Quantity:", quantity);
      console.log("New item:", newItem);
  
      //This is for reset the form after submit
      setDescription("");
      setQuantity("1");
      setIsCustomQuantity(false);
      setCustomQuantity("");
      //~
  
      onAddItem(newItem);
    }
    
    function handleQuantityChange(e) {
        const value = e.target.value;
        if (value === "more") {
          setIsCustomQuantity(true);
        } else {
          setIsCustomQuantity(false);
          setQuantity(value);
        }
      }
  
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need to pack?</h3>
        <select
          value={isCustomQuantity ? "more" : quantity}
          onChange={handleQuantityChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="more">More...</option>
        </select>
  
      {/* Render custom input field when "more..." is selected */}
      {isCustomQuantity && (
        <input
          type="number"
          placeholder="Enter quantity"
          value={customQuantity}
          onChange={(e) => setCustomQuantity(e.target.value)}
        />
      )}

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
  