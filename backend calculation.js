const LOCALISED = 0; // set to 1 if using local server
var GITRAW;
if (!LOCALISED) {
    GITRAW = "https://raw.githubusercontent.com/vyshor/university_expense/master/";
} else {
    $.noConflict();
    GITRAW = "";
}

var SQL = require('sql.js');
var fs = require('fs');
var filebuffer = fs.readFileSync(GITRAW + 'Python/course_info.sqlite');
var db = new SQL.Database(filebuffer);

window.onload = function () {

    // Change the course available when university is picked
    document.getElementById('course').style.visibility = 'hidden';
    document.getElementById("uni").onchange = function () {
        var uni = this.value;
        if (uni === "") return; // please select - possibly you want something else here

        jQuery.ajax(GITRAW + "Python/" + uni + "_courses.json", {
            async: true, success: function (fees) {
                jQuery('#course')
                    .find('option')
                    .remove()
                    .end();
                if (!LOCALISED) {
                    fees = JSON.parse(fees);
                }
                jQuery.each(fees, function (i, item) {
                    jQuery('#course').append(jQuery('<option>', {
                        value: item,
                        text : item
                    }));
                });
            }
        });

        document.getElementById('course').style.visibility = 'visible';
    }

    // Change the course fees when course is changed
    document.getElementById("course").onchange = function () {
        var course = this.value;
        var uni = document.getElementById("uni");
        if (course === "") return; // please select - possibly you want something else here

        var output = db.prepare("SELECT cost FROM courseInfo WHERE uni=:aval AND course=:bval");
        var result = stmt.getAsObject({':aval' : uni, ':bval' : course});
        console.log(result);
        document.getElementById("course_fees").innerHTML = result;
    }
}

function calculate_expenditure_with_hostel(monthly_expense) {
    var data = JSON.stringify(false);
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            const individual_expense = JSON.parse(this.responseText);
            var hostel_fees;
            monthly_expense -= individual_expense[2]["IndividualExpense"]; // minus housing and related expenses
            monthly_expense -= individual_expense[4]["IndividualExpense"] * 0.5; // minus transport expense by half
            monthly_expense -= individual_expense[8]["IndividualExpense"]; // minus accomodation expenses

            jQuery.ajax(GITRAW + "Python/" + document.getElementById("uni").value + "_hostel.json", {
                async: false, success: function (fees) {
                    monthly_expense += fees[0];
                    hostel_fees = fees[0]
                }
            });

            document.getElementById("expense").innerHTML = "$" + monthly_expense.toFixed(2);
            document.getElementById("hostel_fees").innerHTML = "Hostels Fees: $" + hostel_fees.toFixed(2);
            // console.log("monthly expense: " + monthly_expense);
        }
    });
    xhr.open("GET", "http://dev.bambu.life:8081/api/ExpenseEstimator?total_expense=" + monthly_expense);
    xhr.send(data);
}

function estimated_monthly_expenditure() {
    var data = JSON.stringify(false);
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            var expense = JSON.parse(this.responseText);
            if (document.getElementById("hostel").checked) {
                calculate_expenditure_with_hostel(expense);
            } else {
                document.getElementById("expense").innerHTML = "$" + expense.toFixed(2);
                document.getElementById("hostel_fees").innerHTML = "";

            }
        }
    });
    xhr.open("GET", "http://dev.bambu.life:8081/api/TotalExpenseEstimator?monthly_income=" + 0);
    xhr.send(data);

}
