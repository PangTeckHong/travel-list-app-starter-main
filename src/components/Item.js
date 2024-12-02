export default function Item({ item, onDeleteItem,onUpdateItem }) {
    return (
      <li style={{textDecoration: item.packed ? "line-through" : ""}}>
        <input type="checkbox" value={item.packed} onChange={() => onUpdateItem(item.id)} />
        {item.description} - {item.quantity}
        <button style={{ color: "Red"}} onClick={() => onDeleteItem(item.id)}>X</button>
      </li>
    );
  }