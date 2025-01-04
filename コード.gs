/////認証用doPost//////
function doPost(e){
 const params = JSON.parse(e.postData.getDataAsString());

  if (params.type === "url_verification") {
    return ContentService.createTextOutput(params.challenge);
  }
}

/////チャンネル作成通知されたら読み取るdoPost//////
/*チャンネル作成されたらdoPostで読み取り,通知を行うスクリプト*/



function doPost(e) {
  var slackVerificationToken = "aaaaaaaabbbbbbbbbbbbbbbb"; // Verification Token
  var slackBotToken = "xoxb-aaaaaaaaaaaaa-bbbbbbbbbbbbb-cccccccccccccccccccccccc"; // SLack Botトークン

  var payload = JSON.parse(e.postData.contents);
  if (payload.token != slackVerificationToken) {
    throw new Error("Invalid Slack verification token.");
  }

  if (payload.event.type == "channel_created") {
    var channelName = payload.event.channel.name;
    var channelId = payload.event.channel.id;

    var message = "新しいチャンネルが作成されました！: \n <#" + channelId + "|" + channelName + ">";

    postToSlack(slackBotToken, message);
  }
}

function postToSlack(slackBotToken, message) {
  var url = "https://slack.com/api/chat.postMessage"; 
  var channelID = "CXXXXXXXXXX";//通知を行うチャンネルID
  
  var payload = {
    headers: {
      Authorization: "Bearer " + slackBotToken,
      "Content-Type": "application/json"
    },
    method: "post",
    payload: JSON.stringify({
      channel: channelID,
      text: message
    })
  };

  UrlFetchApp.fetch(url, payload);
}

