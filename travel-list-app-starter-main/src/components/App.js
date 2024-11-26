import { useState } from "react";

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({onAddItem}) {
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
    setDescription("");
    setQuantity("1");

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

function PackingList({items, onRemoveItem, onTogglePacked}) {
  
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} onRemoveItem={onRemoveItem} onTogglePacked={onTogglePacked}/>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onRemoveItem,onTogglePacked }) {
  return (
    <li style={{textDecoration: item.packed ? "line-through" : ""}}>
      <input type="checkbox" checked={item.packed} onChange={() => onTogglePacked(item.id)} />
      {item.description} - {item.quantity}
      <button style={{ color: "black"}} onClick={() => onRemoveItem(item.id)}>Remove</button>
    </li>
  );
}

function Stats({ items }) {
  const totalItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = totalItems ? Math.round((packedItems / totalItems) * 100) : 0;

  return (
    <footer className="stats">
      <em>
        You have {totalItems} items in the list. You already packed {packedItems} (
        {percentage}%).
      </em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((prevItems) => [...prevItems, item]);
  }

  function handleRemoveItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }
  function handleTogglePacked(id) {
    setItems((prevItems) => prevItems.map((item) => item.id === id ? {...item, packed: !item.packed} : item));
  }
  
  
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onRemoveItem={handleRemoveItem} onTogglePacked={handleTogglePacked}/>
      <Stats items={items} />
    </div>
  );
}

export default App;
