
const textLabels = async (text) => {
    return 'Text: ' + text;
}

const imageLabels = async (filePath) => {
    return 'Image: ' + filePath
}


module.exports = {textLabels, imageLabels} 