function addVectors(...vectors){
    let sum = [0, 0]
    for (const vecor of vectors) {
        sum[0] = sum[0] + vecor[0]
        sum[1] = sum[1] + vecor[1]
    }
    return(sum)
}

function multiplyVector(num, vector){
    const newVect = vector.map(el => num * el )
    return newVect
}

function subtractVectors(vec1, vect2){
    const diff = [vec1[0] - vect2[0], vec1[1] - vect2[1]]
    return(diff)
}

function sizeOfVector(vect){
    const size = Math.hypot(...vect)
    return size
}

function distance(obj1, obj2){
    const [x, y] = [obj1[0] - obj2[0], obj1[1] - obj2[1]]
    const distance = Math.hypot(x, y)
    return distance
}


function normaliseVector(vect){
    const size = Math.hypot(...vect)
    const unitVect = vect.map(el => el/size )
    return unitVect
}

function randomUnitVect(){
    const vect = [-1 + 2 * Math.random(), -1 + 2 * Math.random()]
    const unitVect = normaliseVector(vect)
    return unitVect
}

export { normaliseVector, randomUnitVect, addVectors, distance, subtractVectors, multiplyVector, sizeOfVector }