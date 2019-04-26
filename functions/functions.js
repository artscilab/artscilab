
let convertUrlToHttps = (url) => {
  if (url != undefined)
    return url.replace("http://", "https://")
  else  
    return null
}

export {convertUrlToHttps}