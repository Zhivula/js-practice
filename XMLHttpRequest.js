let req = new XMLHttpRequest();
req.open("GET", "text.txt", true);
req.addEventListener("load", function () {
	console.log("Done: ", req.status);
});
req.send(null);

/*let re = new XMLHttpRequest();
re.open("GET", "test.json", false);
re.send(null);
console.log(JSON.parse(re.responseText));*/

function getURL(url, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.addEventListener("load", function() {
   	if (req.status < 400) callback(req.responseText);
   	else callback(null, new Error("Request failed: " + req.statusText));
  });
  req.addEventListener("error", function() {
   	callback(null, new Error("Network error"));
  });
  req.send(null);
}
//Promise==================================================
function get(url) {
  return new Promise(function(succeed, fail) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.addEventListener("load", function() {
      if (req.status < 400)
        succeed(req.responseText);
      else
        fail(new Error("Request failed: " + req.statusText));
    });
    req.addEventListener("error", function() {
      fail(new Error("Network error"));
    });
    req.send(null);
  });
}
/*get("example/data.txt").then(function(text) {
  console.log("data.txt: " + text);
}, function(error) {
  console.log("Failed to fetch data.txt: " + error);
});*/
function getJSON(url) {
  return get(url).then(JSON.parse);
}
/*let req = new XMLHttpRequest();
req.open("GET", "example/data.txt", true);
req.addEventListener("load", function() {
  console.log(req.statusCode);
});
req.send(null);*/
