function ControlElement({title, propertyName, properties, updateProperties, minValue, maxValue, step=1}) {
    return ( 
        <div style={{padding: "10px"}}>
            <div>
                {title} {properties[propertyName]}
            </div>

            <div >
                <input className="slider" type="range" step={step} min={minValue} max={maxValue} value={properties[propertyName]} onChange={(e) => updateProperties(propertyName, e.target.value) }/>
            </div>
        </div>
     );
}

export default ControlElement;