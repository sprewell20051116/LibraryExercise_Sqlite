//  Declare SQL Query for SQLite
 
//var createStatement = "CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, useremail TEXT)";
var createStatement = "CREATE TABLE IF NOT EXISTS Userlist (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, cardid TEXT, mobile TEXT, addr TEXT, password TEXT)";
 
 
//var selectAllStatement = "SELECT * FROM Contacts";
var selectAllStatement = "SELECT * FROM Userlist";
 
//var insertStatement = "INSERT INTO Contacts (username, useremail) VALUES (?, ?)";
var insertStatement = "INSERT INTO Userlist (user, mobile) VALUES (?, ?)";
 
var updateStatement = "UPDATE Contacts SET user = ?, mobile = ? WHERE id=?";
 
var deleteStatement = "DELETE FROM Userlist WHERE id=?";
 
var dropStatement = "DROP TABLE Userlist";
 
 var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;
 
 function initDatabase()  // Function Call When Page is ready.
 
{
 
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
 
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
 
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
 
{
 
    db.transaction(function (tx) { tx.executeSql(createStatement, [], showRecords, onError); });
 
}
 
function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
 
{
 
        var usernametemp = $('input:text[id=user]').val();
 
        var useremailtemp = $('input:text[id=useremail]').val();
        db.transaction(function (tx) { tx.executeSql(insertStatement, [usernametemp, useremailtemp], loadAndReset, onError); });
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}
 
function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
 
{
 
    var usernameupdate = $('input:text[id=user]').val().toString();
 
    var useremailupdate = $('input:text[id=useremail]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
 
}
 
function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
 
{
 
    db.transaction(function (tx) { tx.executeSql(dropStatement, [], showRecords, onError); });
 
    resetForm();
 
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
 
{
 
    var item = dataset.item(i);
 
    $("#user").val((item['user']).toString());
 
    $("#useremail").val((item['useremail']).toString());
 
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
 
{
 
    $("#user").val("");
 
    $("#useremail").val("");
 
    $("#id").val("");
 
}
 
function loadAndReset() //Function for Load and Reset...
 
{
 
    resetForm();
 
    showRecords()
 
}
 
function onError(tx, error) // Function for Hendeling Error...
 
{
 
    alert(error.message);
 
}
 
function showRecords() // Function For Retrive data from Database Display records as list
 
{
 
    $("#results").html('')
 
    db.transaction(function (tx) {
 
        tx.executeSql(selectAllStatement, [], function (tx, result) {
 
            dataset = result.rows;
 
            for (var i = 0, item = null; i < dataset.length; i++) {
 
                item = dataset.item(i);
 
                var linkeditdelete = '<li>' + item['user'] + ' , ' + item['useremail'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
 
                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
 
                $("#results").append(linkeditdelete);
 
            }
 
        });
 
    });
 
}
 
$(document).ready(function () // Call function when page is ready for load..
 
{
;
 
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
 
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
 
    $("#btnUpdate").click(updateRecord);
 
    $("#btnReset").click(resetForm);
 
    $("#btnDrop").click(dropTable);
 
});