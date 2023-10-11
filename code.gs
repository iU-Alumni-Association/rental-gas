function doGet() {
  let html = HtmlService.createHtmlOutputFromFile('index.html');
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html.setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function saveData(n, sId, itms, borrowDate, startTime, endTime) {  
    let sh = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let d = new Date();
    sh.appendRow([d, n, sId, borrowDate, startTime, endTime].concat(itms)); 

    sendToSlack(n, sId, itms, borrowDate, startTime, endTime); 
}

function sendToSlack(n, sId, itms, borrowDate, startTime, endTime) {
  const formTitle = "倉庫管理フォーム"; 
  const formUrl = "https://docs.google.com/spreadsheets/d/1hQQntKjqHPf9gZgyMfnR9oRr04zGNtwF1vpTLC_bAXc/edit?usp=sharing";

  let message = `:gopher-dance: *${formTitle} - 回答通知* :gopher-dance:\n\n`;

  message += `:bust_in_silhouette: 名前: ${n}\n`;
  message += `:page_facing_up: 学籍番号 ${sId}\n`;
  message += `:calendar: 借りたい日付: ${borrowDate}\n`;
  message += `:clock10: 借りる時間: ${startTime}\n`;
  message += `:clock1030: 返却時間: ${endTime}\n`;

  itms.forEach((item, index) => {
    let emoji = ":package:";
    message += `${emoji} レンタル ${index + 1}: ${item}\n`;
  });

  message += `\n:link: <${formUrl}|管理シートのリンク>`;

  const webhookUrl = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");
  const options = {
    "method" : "POST",
    "contentType" : "application/json",
    "payload" : JSON.stringify({"text": message})
  };

  UrlFetchApp.fetch(webhookUrl, options);
}

function getItemsFromSheet() {
    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Item");
    let range = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5);
    return range.getValues();
}