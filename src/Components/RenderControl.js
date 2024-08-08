import React from "react";


const RenderControl = ({ objType, id, hasProperties,handleRemoveItem }) => {
  let content;


 
  switch (objType) {
    case 'Textbox':
      content = <><input ></input><button onClick={
        () => handleRemoveItem(id)}>
        X
    </button></>;
      break;
    case 'Button':
      content = <><button >{objType}</button><button onClick={
        () => handleRemoveItem(id)}>
        X
    </button></>;
      break;
    case 'Select':
      content = <><select ><option>1</option><option>2</option></select> <button onClick={
        () => handleRemoveItem(id)}>
        X
    </button></> ;
      break;
    default:
      content = <> <button >{objType}</button>   <button onClick={
        () => handleRemoveItem(id)}>
        Remove
    </button> </> ;
  }
  return (
    <>
      <div>{content}</div>

    </>
  )

}

export default RenderControl