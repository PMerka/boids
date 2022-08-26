import ControlElement from "./ControlElement";

function Controls({ updateProperty, property, activeGroup, setActiveGroup, setProperty, addNewBoidGroup }) {
  console.log("Length", property)
  const x = Array.from(Array(10).keys())
  return (
    <div className="options-element">
     


      <ControlElement
        title={"Perception radius"}
        propertyName={"perception"}
        properties={property[activeGroup]}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={100}
      />

    <ControlElement
        title={"Maximum speed"}
        propertyName={"maxSpeed"}
        properties={property[activeGroup]}
        updateProperties={updateProperty}
        minValue={1}
        maxValue={5}
        step={0.1}
      />

    <ControlElement
        title={"Maximum Force"}
        propertyName={"maxForce"}
        properties={property[activeGroup]}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={1}
        step={0.01}
      />

    <ControlElement
        title={"Aligment Force"}
        propertyName={"alignForce"}
        properties={property[activeGroup]}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={1}
        step={0.01}
      />

    <ControlElement
        title={"Atraction Force"}
        propertyName={"cohesionForce"}
        properties={property[activeGroup]}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={1}
        step={0.01}
      />

    <ControlElement
        title={"Repulsion Force"}
        propertyName={"separationForceConstant"}
        properties={property[activeGroup]}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={30}
        step={0.1}
      />

    <div style={{padding: "10px", paddingTop: "30px"}}>
        Add new boid by click on the canvas. 
    </div>

    <div style={{padding: "10px", paddingTop: "25px"}}>
        Groups:
        <div className="group-picking-wrapper">
        

          <div className="active-group-options-list">
            
            {property.map( (element, index) => {
                return <div className={(index === activeGroup) ? 'active-group-options active-group-options-current' : 'active-group-options' }  key={index} onClick={() => setActiveGroup(index)}> {index+1} </div>
            })}
          </div>
          
          <div className="addNewGroup" onClick={() => addNewBoidGroup(20) }>+</div>
        
        </div>   
    </div>

    </div>
  );
}

export default Controls;
