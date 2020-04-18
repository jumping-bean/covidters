const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];


class Employee {
    constructor(id=Math.floor(Math.random() * 1000),
    uifRef="0000003/4", 
    shutFrom=new Date('2020-03-27'), 
    shutTo=new Date('2020-4-30'),
    tradingName="Test Industries",
    payeNumber="",
    contactNumber="0123456789",
    emailAddress="Test@email.com",
    idNumber="8912306029185",
    firstName="Joe",
    lastName="Soap",
    renumeration=4000,
    employmentStart=new Date('2011-01-01'),
    employmentEnd = new Date("2011-04-26"),
    minWage = 3500,
    renumerationReceived=0,
    bankName="FNB"
    ) {
        this.id = id;
        this.uifRef = uifRef;
        this.tradingName = tradingName;
        this.shutFrom = this.convertToDate(shutFrom);
        this.shutTo = this.convertToDate(shutTo);
        this.payeNumber =payeNumber;
        this.contactNumber=contactNumber;
        this.emailAddress=emailAddress;
        this.idNumber = idNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.renumeration=renumeration;
        this.empStart=employmentStart;
        this.empEnd = employmentEnd;
        this.minWage = minWage;
        this.renumerationReceived=renumerationReceived;
        this.bankName= bankName;
    }

    convertToDate(value) {
        let date;
        if (value instanceof Date && !isNaN(value)) {
            date = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0));
        } else {
            if (!isNaN(value)) {
                //sanity check to ensure date note more than 3 months old if a number is passed in.
                if (value < (Date.now() - 788499999)) {
                    throw "invalid date";
                }
            } else {
                let time = Date.parse(value);
                if (isNaN(time)) {
                    throw "invalid date"
                }
                date = new Date(time);
                date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
            }
        }
        return date;
    }

    convertDateToString(value, labourGovFormat) {
        let date = this.convertToDate(value);
        var day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        if (!labourGovFormat) {
            let month = date.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            return date.getFullYear() + "-" + month + "-" + day;
        } else {
            return day + "-" + months[date.getMonth()] + "-" + date.getFullYear();
        }
    }

    getShutdownFromAsString(labourGovFormat = false) {
        return this.convertDateToString(this.shutFrom, labourGovFormat);
    }

    getShutdownToAsString(labourGovFormat = false) {
        return this.convertDateToString(this.shutTo, labourGovFormat);
    }

    get shutdownFrom() { return this.getShutdownFromAsString(true) }
    get shutdownTo() { return this.getShutdownToAsString(true) }

    get shutdownFromHTML() { return this.getShutdownFromAsString(false) }
    get shutdownToHTML() { return this.getShutdownToAsString(false) }

    set shutdownFrom(fromDate){
        this.shutFrom = this.convertToDate(fromDate);
    }
    set shutdownTo(toDate){
        this.shutTo = this.convertToDate(toDate);
    }

    get employmentStart() { return this.getEmploymentStartAsString(true) }
    get employmentEnd() { return this.getEmploymentEndAsString(true) }

    get employmentStartHTML() { return this.getEmploymentStartAsString(false) }
    get employmentEndHTML() { return this.getEmploymentEndAsString(false) }

    set employmentStart(startDate){
        this.empStart = this.convertToDate(startDate);
    }
    set employmentEnd(endDate){
        this.empEnd = this.convertToDate(endDate);
    }

    getEmploymentStartAsString(labourGovFormat = false) {
        return this.convertDateToString(this.empStart, labourGovFormat);
    }

    getEmploymentEndAsString(labourGovFormat = false) {
        return this.convertDateToString(this.empEnd, labourGovFormat);
    }

}

export default Employee;