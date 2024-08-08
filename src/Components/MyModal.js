import React,{useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './style.css';
import { useDispatch } from 'react-redux';
import { saveFormData } from '../store/formslice';
import { useSelector } from 'react-redux';

const MyModal = ({ isOpen, onClose,controlType,resetFormData,onSubmitClose,controlID,openModal}) => {
  const { register, handleSubmit, reset,formState: { errors } } = useForm();
  const formData = useSelector((state) => state.form.formData);
  const [apiKeys, setAPIKeys] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // Reset the form when the component loads
    
    reset({
      name: '',
      onChangeEvent: ''
    });
  }, [reset]);


  const handleGenerateKeys = (e)=>{
    e.stopPropagation()
    console.log("sampleAPIResponse",formData.name);
    
    setAPIKeys(extractKeys(formData.sampleAPIResponse));


   // openModal();
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

  const onSubmit = data => {
   //console.log(data);
    
    const updateddata = [{...data,"controlType":controlType,"controlID":controlID,"Keys":apiKeys}];
    const updatedFormData = [...formData,...updateddata]
    
    dispatch(saveFormData(updatedFormData));
    onSubmitClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content form">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>Control Pannel</h2>
        <form autoComplete="off">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label htmlFor="onChangeEvent">On Change Event Name</label>
            <input
              id="onChangeEvent"
              
              {...register('onChangeEvent')}
            />
          </div>
          <div>
            <label htmlFor="isMandatory">Is Mandatory?</label>
            <select
              id="isMandatory"
              {...register('isMandatory')}
            >
              
              <option value={"Yes"}>Yes</option>
              <option value={"No"}>No</option>
              </select>
          </div>
          <div>
            <label htmlFor="submitDataToAPI">Submit Data to API URL</label>
            <input
              id="submitDataToAPI"
              {...register('submitDataToAPI')}
            >             
              </input>
          </div>
          <div>
            <label htmlFor="sampleAPIResponse">Sample API Response</label>
            <textarea
              id="sampleAPIResponse"
              {...register('sampleAPIResponse')}
            >             
              </textarea>
          </div>
          <button onClick={handleGenerateKeys}>Generate KEYS</button>
          <button type="submit" onClick={handleSubmit(onSubmit)} >Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MyModal;
