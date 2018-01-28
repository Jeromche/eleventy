'use strict';

var request = require("request");
var oauth_token = process.env.NETLIFY_TOKEN;

export function handler(event, context, callback) {

  // parse the payload
  var body = event.body.split("payload=")[1];
  var payload = JSON.parse(unescape(body));
  var method = payload.actions[0].name
  var id = payload.actions[0].value

  console.log(method, id);

  if(method == "delete") {
    // delete: delete this submission via the api
    var url = "https://api.netlify.com/api/v1/submissions/" +id + "?access_token=" + oauth_token;
    request.delete(url, function(err, response, body){
      if(!err){
        console.log("Deleted");
        callback(null, {
          statusCode: 200,
          body: "Comment deleted"
        })
      }
    });
  } else if (method == "approve"){
    // approve: post this comment to the approved comments form and let Netlify trigger a build to include it.
    callback(null, {
      statusCode: 200,
      body: "Comment approved. Site deploying to include it."
    })
  }

}


  // get the action we'll perform" [ delete | approve ]
  // var action = event.queryStringParameters['action'];
