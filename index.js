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
const getCoordinateX = (length, angle) => { 
    // Преобразование входных данных
    const convertToRadians = (angleDeg) => { 
        const pi = Math.PI;
        return (angleDeg * pi / 180)
    }

 // Вычисление координат
    const angleRad = convertToRadians(angle);
    const x =  Math.round (length/10 * Math.cos(angleRad));
    //const y = Math.round (length/10 * Math.sin(angleRad));
    //return [Math.abs(x), Math.abs(y)];
    return x;
}
const getCoordinateY = (length, angle) => {
    // Преобразование входных данных
    const convertToRadians = (angleDeg) => {
        const pi = Math.PI;
        return (angleDeg * pi / 180)
    }

    // Вычисление координат
    const angleRad = convertToRadians(angle);
    //const x = Math.round(length / 10 * Math.cos(angleRad));
    const y = Math.round (length/10 * Math.sin(angleRad));
    //return [Math.abs(x), Math.abs(y)];
    return y;
}

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
    //return [Math.abs(x), Math.abs(y)];
    return [x,y];
}


const getPath = () => { 
    const initial = [222,224];
    const pointsStr = data.map((point, index) => { 
        const x = getCoordinateX(point.length, point.angle);
        const y = getCoordinateY(point.length, point.angle);
        //point[index] = getCoordinates(point.length, point.angle);
        point[index] = [x, y];
     
        console.log(`point[${index}]: ${point[index]} `);
        //return parseFloat(point[index].join(' '), 10);
        return point[index];
    })
    let pointsWithoutGap = [ ...pointsStr.reverse()];
    //let pointsRev = [...pointsStr.reverse()]
    let copy = [...pointsWithoutGap];
    //let copy = [...pointsWithoutGap];
        //pointsWithoutGap = pointsStr.concat.apply(initial, pointsStr);
    let merged = [];
    merged = merged.concat.apply(merged, pointsWithoutGap);
    //let copy = [...merged];
    //const pointsAdd = merged.concat.apply(pointsStr,initial);
    let bufer = [...initial];
    console.log('copy', copy);
    console.log('merged', merged);
    //const pointsStart = merged.concat.apply(initial, pointsStr);
    const absolutePath = pointsWithoutGap.map((absPoint, index) => { 
        pointsWithoutGap.splice(0,bufer);
        absX = absPoint[0] + copy[index][0];
        absY = absPoint[1] + copy[index][1];
        absPoint[index] = [absX, absY];
        bufer = [absX, absY];
        console.log(absX, absY);
        return [absX, absY];
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
    //path.setAttribute('d', `M${Math.round(startPointX / 10)}  ${Math.round(startPointY / 10)}  ${pointsPath} z`);
    const testPath = 'L0 130 L56 130 L56 224 L222 224 L222 0';
    // path.setAttribute('d', `M${Math.round(startPointX / 10)}  ${Math.round(startPointY / 10)} L0 0 `);
    path.setAttribute('d', `M${Math.round(startPointX / 10)}  ${Math.round(startPointY / 10)}  ${testPath} z`);
}
createSvg(getPath());



