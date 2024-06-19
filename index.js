const data = [
    {
        "length": 1665,
        "angle": 0,
    },
    {
        "length": 947,
        "angle": 90,
    },
    {
        "length": 557,
        "angle": 0,
    },
    {
        "length": 1300,
        "angle": 90,
    },
    {
        "length": 2225,
        "angle": 180,
    },
    {
        "length": 2239,
        "angle": 270,
    },
];


const getCoordinates = (length, angle) => { 
    // Преобразование входных данных
    const convertToRadians = (angleDeg) => { 
        const pi = Math.PI;
        return (angleDeg * pi / 180)
    }

 // Вычисление координат
    const angleRad = convertToRadians(angle);
    const x =  Math.round (length/10 * Math.cos(angleRad));
    const y = Math.round (length/10 * Math.sin(angleRad));
    return [Math.abs(x), Math.abs(y)];
}


const getPath = () => { 
    const initial = [0,0];
    const pointsStr = data.map((point, index) => { 
        // const x = getCoordinateX(point.length, point.angle);
        // const y = getCoordinateY(point.length, point.angle);
        point[index] = getCoordinates(point.length, point.angle);;
        console.log(`point[${index}]: ${point[index]} `);
        //return parseFloat(point[index].join(' '), 10);
        return point[index];
    })

    let merged = [];
    merged = merged.concat.apply(merged, pointsStr);
    //const pointsAdd = merged.concat.apply(pointsStr,initial);
    const pointsStart = merged.concat.apply(initial, pointsStr);
    const absolutePath = merged.map((absPoint, index) => { 
        return absPoint + pointsStart[index];
    })


    console.log('map', absolutePath);
    return absolutePath.join(' ');
}



const createSvg = (pointsPath) => { 
    // const startPointX = 2225;
    // const startPointY = 2239;
    const startPointX = 0;
    const startPointY = 0;
    let path = document.getElementById("plan");
    path.setAttribute('d', `M${Math.round(startPointX / 10)}  ${Math.round(startPointY / 10)}  ${pointsPath} z`);

    // path.setAttribute('d', `M${Math.round(startPointX / 10)}  ${Math.round(startPointY / 10)} L0 0 `);
    
}
createSvg(getPath());



