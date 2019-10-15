
let convertUrlToHttps = (url) => {
  if (url != undefined)
    return url.replace("http://", "https://")
  else  
    return null
}

let formatDate = (date) => {
  let m = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  return `${m[monthIndex]} ${day}, ${year}`;
}

export {convertUrlToHttps, formatDate}