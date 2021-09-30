var currentTime ="";
const INTERVAL = 60;
var timeLeft = INTERVAL;
var tasks;
const DAILYSCHEDULE_KEY = "daily_schedule";
var currentDate = moment().format('MM/DD/YYYY');
init();

function init() {
  tasks = getData();
  generateRows(9, 17);
  getCurrentTime();
}
$('#currentDay').text(currentDate);
// Function for 60 second timer for formatting
function timer() {
    timeInterval = setInterval(function() {
      if(timeLeft <= 0){

        clearInterval(timeInterval);
        getCurrentTime();
        timeLeft = INTERVAL;
      } else {
        timeLeft--;
      }
    }, 1000);
    }

// Function to get the current time
function getCurrentTime() {
    currentTime =  moment().format('HH');
    formatRows(); 
}

// Function to format rows based on the current time
function formatRows() {
    for(var i = 9; i<18;i++){
        var row =$("#hour" + i);
        if(i < currentTime){
            row.removeClass("present future").addClass("past");
        } else if(i == currentTime){
            row.removeClass("past future").addClass("present");
        } else{
            row.removeClass("past present").addClass("future");
        }
    }
    timer();
}

function generateRows (start, end){
  var containerParent = $('#rowContainer');
  for (var i = start; i <= end; i++) {
    addRow("hour" + i, containerParent, getLabelHour(i)); 
  }
}

//FUNCTION TO ADD ROW
function addRow(rowID, container, labelText) {
  //generate the parent row
  var row = $(document.createElement("div"));
  row.addClass("row"); 
  container.append(row);

  //generate the first child row (label field)
  var labelDiv = $(document.createElement("div"));
  labelDiv.addClass("col-lg-1 col-md-2 hour");
  labelDiv.text (labelText);
  row.append(labelDiv);

  //generate the second child row (input field)  
  var inputDiv = $(document.createElement("div"));
  inputDiv.addClass("col-lg-10 col-md-9 col-sm-8");
  inputDiv.prop("id", rowID);
  row.append(inputDiv);

  //generate the <p> inside the input field child row
  var inputParagraph = $(document.createElement("p"));
  inputParagraph.addClass("input");
  inputParagraph.prop("id", rowID + "p");
  inputDiv.append(inputParagraph);

  //generate the input field inside the <p>
  var inputField = $(document.createElement("input"));
  inputField.addClass("input");
  inputField.prop("type", "text")
  inputField.prop("id", rowID + "Input");
  inputField.val(tasks[rowID]);
  inputParagraph.append(inputField);

  //generate the third childe row (button)
  var btnDiv = $(document.createElement("div"));
  btnDiv.addClass("col-1 saveBtn");
  row.append(btnDiv);

  //generate the button icon
  var btnSpan = $(document.createElement("span"));
  btnSpan.addClass("oi oi-box saveBtnIcon");
  btnSpan.prop("id", rowID + "btn");
  btnDiv.append(btnSpan);
  btnDiv.click(function () {
    var text = inputField.val();
    saveData(rowID, text);
  });
}

//Convert label to AM/PM
function getLabelHour(hour) {
  var date = new moment();
  date.set("hour", hour);
  return date.format("h a");
}

function saveData(hour, task) {
  tasks[hour] = task;
  localStorage.setItem(DAILYSCHEDULE_KEY, JSON.stringify(tasks));
}

function getData() {
  var savedTask = localStorage.getItem(DAILYSCHEDULE_KEY);
  if(!savedTask) {
    return {};
  }
  return JSON.parse(savedTask);
}


