import ControlElement from "./ControlElement";

function Controls({ updateProperty, property, setProperty }) {
  return (
    <div className="options-element">
     
      <ControlElement
        title={"Perception radius"}
        propertyName={"perception"}
        properties={property}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={100}
      />

    <ControlElement
        title={"Maximum speed"}
        propertyName={"maxSpeed"}
        properties={property}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={10}
      />

    <ControlElement
        title={"Maximum Force"}
        propertyName={"maxForce"}
        properties={property}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={1}
        step={0.01}
      />

    <ControlElement
        title={"Aligment Force"}
        propertyName={"alignForce"}
        properties={property}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={1}
        step={0.01}
      />

    <ControlElement
        title={"Atraction Force"}
        propertyName={"cohesionForce"}
        properties={property}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={1}
        step={0.01}
      />

    <ControlElement
        title={"Repulsion Force"}
        propertyName={"separationForceConstant"}
        properties={property}
        updateProperties={updateProperty}
        minValue={0}
        maxValue={30}
        step={0.1}
      />
    </div>
  );
}

export default Controls;
