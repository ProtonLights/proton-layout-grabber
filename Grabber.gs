function doGet() {
  var spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/11D9P8vZYA5W9DmjH3K6yfWBtxBExGiJ-tR3maVuauN8/edit#gid=0');
  var sheet = spreadsheet.getSheets()[0];
  var values = sheet.getSheetValues(1,1, sheet.getLastRow(), 12);
  
  var finalOutput = {
    layoutName: sheet.getName(),
    channels: []
  };
  
  for (var y = 1; y < values.length; y++) {
    var fixture = values[y];
    var dmxChannel = fixture[0];
    var fixtureName = fixture[1];
    var channelName = fixture[2];
    var color = fixture[3];
    var num_primary = fixture[4];
    var num_secondary = fixture[5];
    var location = fixture[8];
    var rotation = fixture[9];
    var width = fixture[10];
    var height = fixture[11];
    
    if (num_primary == '') {
      num_primary = 0;
    }
    
    if (num_secondary == '') {
      num_secondary = 0;
    }
    
    if (location == '') {
      location = '0,0,0';
    }
    
    if (rotation == '') {
      rotation = '0,0,0';
    }
    
    var fixture = {
      dmxChannel: dmxChannel,
      fixtureName: fixtureName,
      channelName: channelName,
      color: color,
      num_primary: num_primary,
      num_secondary: num_secondary,
      location: location,
      rotation: rotation,
      width: width,
      height: height
    }
    
    finalOutput.channels.push(fixture);
    
    var stringOutput = "DMX: " + dmxChannel + " Object: " + channelName + " Location: " + location + "\n";
    
    Logger.log(stringOutput + "\n");
  }
  
  return ContentService.createTextOutput(JSON.stringify(finalOutput))
    .setMimeType(ContentService.MimeType.JSON);
}