exports.imageUrl = (doc, path) => {
    if (doc.imageCover) {
        const imageUrl = doc.imageCover;
        doc.imageCover = `${process.env.BASE_URL}/${path}/${imageUrl}`;
    }
    if (doc.images) {
        const imagesList = [];
        doc.images.forEach((element) => {
            imagesList.push(`${process.env.BASE_URL}/${path}/${element}`);
        });
        doc.images = imagesList;
    }
}