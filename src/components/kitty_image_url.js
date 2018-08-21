import validator from 'validate-image-url';

export const kittyImageUrl = (id) => {

  const urlSvg = (id) => {
    return `https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${id}.svg`;
  }

  const urlPng = (id) => {
    return `https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/${id}.png`;
  }

  const promise = validator({url: urlSvg(id), timeout: 10000})
    .then(({image, url}) => {
      return url;
    })
    .catch((err) => {
      return urlPng(id);
    })
}

export default kittyImageUrl;
