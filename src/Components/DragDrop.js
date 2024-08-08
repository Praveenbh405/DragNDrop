import React, { useState } from "react";
import RederList from "./RederList";
import { useDrop } from "react-dnd";
import RenderControl from "./RenderControl";
import MyModal from './MyModal';
import { useSelector,useDispatch } from 'react-redux';
import { saveFormData } from '../store/formslice';


const DragDrop = () => {

    const controlList = [
        {
            id: 1,
            objType: "Textbox",
            hasProperties: true
        },
        {
            id: 2,
            objType: "Button",
            hasProperties: true
        },
        {
            id: 3,
            objType: "Select",
            hasProperties: true
        }
    ]
    const [board, setBoard] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [controlType, setControlType] = useState("");
    const [controlID, setcontrolID] = useState("");
    const [resetFormData, setResetFormData] = useState(false);
    const formData = useSelector((state) => state.form.formData);
    const dispatch = useDispatch();
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "item",
        drop: (item) => addControlToBoard(item.id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));
    const addControlToBoard = (id) => {
        console.log("board", board)
        const fileteredData = controlList.filter(item => item.id == id);       
        setBoard((oldValue) => {
            return [...oldValue, fileteredData[0]]
        });

        setControlType(fileteredData[0].objType);
        setcontrolID(id)
        setResetFormData(true);
        setIsModalOpen(true);
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setBoard([])
        setIsModalOpen(false);
    };

    const handleRemoveItem = (id) => {
        console.log("Remove Item", id);
        console.log("board", board)
        const fileteredData = board.filter(item => item.id != id);
        console.log("fileteredData",fileteredData);
        const filteredFormData = formData.filter(item => item.controlID != id)        
        console.log("filteredFormData",filteredFormData)

        if (fileteredData.length > 0) {            
            setBoard(fileteredData);
            dispatch(saveFormData(filteredFormData));
            
        }
        else {    
               
            setBoard([]);
            dispatch(saveFormData([]));        
        }

    }

    const onSubmitClose = ()=>{
        setIsModalOpen(false);
    }

    const handleClearClick = ()=>{
        console.log("Clear");
        setBoard([]);
        dispatch(saveFormData([]));
    }

   



function getType(value) {
    if (value === null) return 'null';
    if (Array.isArray(value)) {
      if (value.length > 0) {
        return `${getType(value[0])}[]`;
      }
      return 'any[]';
    }
    if (typeof value === 'object') return 'object';
    return typeof value;
  }

  function extractKeys(obj, prefix = '', keys = []) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        keys.push(fullKey);
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          extractKeys(obj[key], fullKey, keys);
        }
      }
    }
    return keys;
  }
  
  const handleParseJONObjClick = ()=>{
    
    const jsonObject = {
        name: "John Doe",
        age: 30,
        email: "john.doe@example.com",
        isActive: true,
        roles: ["admin", "user"],
        address: {
          street: "123 Main St",
          city: "Anytown",
          zip: "12345"
        }
      };
    const keys = extractKeys(jsonObject);
    console.log("keys", keys)
  }

    return (
        <>
            <div>
                <button onClick={handleClearClick}>Clear</button>
            </div>
            <div className="pictures">
                <ul>
                    {controlList.map(item => {
                        return (
                            <>
                                <RederList  id={item.id} objType={item.objType} hasProperties={item.hasProperties}></RederList>
                            </>
                        )
                    })}
                </ul>
            </div>
            <div className="Board" style={{ border: "10px solid red", height: "100px" }} ref={drop}>
                {board.length > 0 &&
                    board.map(item => {
                        return (
                            <>
                                <RenderControl id={item.id} objType={item.objType} hasProperties={item.hasProperties} handleRemoveItem={handleRemoveItem}></RenderControl>
                            </>
                        )
                    })}
            </div>
            {isModalOpen && <MyModal openModal={openModal} onSubmitClose={onSubmitClose} isOpen={isModalOpen} onClose={closeModal} controlType={controlType} controlID={controlID} resetFormData={resetFormData} />}
            <div>
                <h2>Saved Form Data</h2>
                <pre>{JSON.stringify(formData, null, 2)}</pre>
            </div>
            <button onClick={handleParseJONObjClick}>Parse the object</button>
        </>
    )
}

export default DragDrop
