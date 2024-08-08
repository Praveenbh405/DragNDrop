import React from "react";
import { useDrag } from "react-dnd";




const RederList = ({key,objType,id,hasProperties})=>{
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item:{id:id,hasProperties:hasProperties},        
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (<>
                <li key={id} ref={drag}>{objType}</li>
                                
                </>)

};

export default RederList