
const textLabels = async (text) => {
    const language = require('@google-cloud/language');

  // Instantiates a client
    const client = new language.LanguageServiceClient
    const topCategories = []

  // The text to analyze
  

    const document = {
        content: text,
        type: 'PLAIN_TEXT',
    };

    // Detects the sentiment of the text
    const [classification] = await client.classifyText({ document });
    console.log('Categories:');
    classification.categories.forEach(category => {
      console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
    });
 
    for (let i = 0; i < 4; i++) {
        if (!classification.categories[i]) {
        { break; }
        }
        topCategories.push(classification.categories[i].name)
    }
    return topCategories;
}



const imageLabels = async (filePath) => {
    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const topLabels = []

    // Performs label detection on the image file
    const [result] = await client.labelDetection(filePath);
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label));
    labels.forEach(label => console.log(label.description));
    
    for (let i = 0; i < 4; i++) {
        if (!labels[i]) {
            { break; }
        }
        topLabels.push(labels[i].description)
    }
    return topLabels;
}


module.exports = {textLabels, imageLabels} 