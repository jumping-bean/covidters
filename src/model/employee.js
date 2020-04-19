const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


class Employee {
    constructor(id = Math.floor(Math.random() * 1000),
        uifRef = "0000003/4",
        shutFrom = new Date('2020-03-27'),
        shutTo = new Date('2020-4-30'),
        tradingName = "Test Industries",
        payeNumber = "",
        contactNumber = "0123456789",
        emailAddress = "Test@email.com",
        idNumber = "8912306029185",
        firstName = "Joe",
        lastName = "Soap",
        renumeration = 4000,
        employmentStart = new Date('2011-01-01'),
        employmentEnd = new Date("2011-04-26"),
        minWage = 3500,
        renumerationReceived = 0,
        bankName = "First National Bank",
        branchCode = "254005",
        accountType = 1,
        accountNumber = "0123456789",
        paymentMedium = 1
    ) {
        this.id = id;
        this.uifRef = uifRef;
        this.tradingName = tradingName;
        this.shutFrom = this.convertToDate(shutFrom);
        this.shutTo = this.convertToDate(shutTo);
        this.payeNumber = payeNumber;
        this.contactNumber = contactNumber;
        this.emailAddress = emailAddress;
        this.idNumber = idNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.renumeration = renumeration;
        this.empStart = employmentStart;
        this.empEnd = employmentEnd;
        this.minWage = minWage;
        this.renumerationReceived = renumerationReceived;
        this.bankName = bankName;
        this.branchCode = branchCode;
        this.accountType = accountType;
        this.accountNumber = accountNumber;
        this.paymentMedium = paymentMedium;
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

    set shutdownFrom(fromDate) {
        this.shutFrom = this.convertToDate(fromDate);
    }
    set shutdownTo(toDate) {
        this.shutTo = this.convertToDate(toDate);
    }

    get employmentStart() { return this.getEmploymentStartAsString(true) }
    get employmentEnd() { return this.getEmploymentEndAsString(true) }

    get employmentStartHTML() { return this.getEmploymentStartAsString(false) }
    get employmentEndHTML() { return this.getEmploymentEndAsString(false) }

    set employmentStart(startDate) {
        this.empStart = this.convertToDate(startDate);
    }
    set employmentEnd(endDate) {
        this.empEnd = this.convertToDate(endDate);
    }

    getEmploymentStartAsString(labourGovFormat = false) {
        return this.convertDateToString(this.empStart, labourGovFormat);
    }

    getEmploymentEndAsString(labourGovFormat = false) {
        return this.convertDateToString(this.empEnd, labourGovFormat);
    }
    get _rowVariant() {
        if (ValidateEmployeeUtil.validateEmployee(this)) {
            return "info";
        } else {
            return "danger";
        }
    }

    get renumerationAmount(){
            return parseFloat(this.renumeration).toFixed(2);
    }

    get minWageAmount(){
        return parseFloat(this.minWage).toFixed(2);
    }

    get renumerationReceivedAmount(){
        return parseFloat(this.renumerationReceived).toFixed(2);
    }

    asCSV(){
        let csv =[
            this.uifRef,
            this.shutdownFrom,
            this.shutdownTo,
            this.tradingName,
            this.payeNumber,
            this.contactNumber,
            this.emailAddress,
            this.idNumber,
            this.firstName,
            this.lastName,
            this.renumerationAmount,
            this.employmentStart,
            this.employmentEnd,
            this.minWageAmount,
            this.renumerationReceivedAmount,
            this.bankName,
            this.branchCode,
            this.accountType,
            this.accountNumber,
            this.paymentMedium
        ];
        return csv.join("|");
    }

}

class ValidateEmployeeUtil {

    static validateEmployee(employee) {
        return ValidateEmployeeUtil.validUifRef(employee) &&
            ValidateEmployeeUtil.validShutFromDate(employee) &&
            ValidateEmployeeUtil.validPayeNumber(employee) &&
            ValidateEmployeeUtil.validContactNumber(employee) &&
            ValidateEmployeeUtil.validEmailAddress(employee) &&
            ValidateEmployeeUtil.validIdNumber(employee) &&
            ValidateEmployeeUtil.validFirstName(employee) &&
            ValidateEmployeeUtil.validLastName(employee) &&
            ValidateEmployeeUtil.validRenumeration(employee) &&
            ValidateEmployeeUtil.validMinWage(employee) &&
            ValidateEmployeeUtil.validRenumerationReceived(employee) &&
            ValidateEmployeeUtil.validEmploymentStartDate(employee) &&
            ValidateEmployeeUtil.validEmploymentEndDate(employee) &&
            ValidateEmployeeUtil.validBankName(employee) &&
            ValidateEmployeeUtil.validAccountNumber(employee) &&
            ValidateEmployeeUtil.validPaymentMedium(employee)&&
            ValidateEmployeeUtil.validAccountType(employee);
    }

    static validUifRef(employee) {
        let re = /^\d{7}\/\d{1}$/;
        return re.test(employee.uifRef);
    }
    static validShutFromDate(employee) {
        let tmpDate = new Date(employee.shutdownFrom);
        return tmpDate instanceof Date && !isNaN(tmpDate);
    }

    static validShutToDate(employee) {
        let tmpDate = new Date(employee.shutdownTo);
        return tmpDate instanceof Date && !isNaN(tmpDate);
    }

    static validTradeName(employee) {
        return employee.tradingName.length > 0 && employee.tradingName.length <= 120;
    }

    static validPayeNumber(employee) {
        return employee.payeNumber.length <= 20;
    }
    static validContactNumber(employee) {
        return employee.contactNumber.length > 0 && employee.contactNumber.length < 20;
    }

    static validEmailAddress(employee) {
        let valid = employee.emailAddress.length > 0 && employee.emailAddress.length < 20;
        return valid;
    }

    static validIdNumber(employee) {
        let re = /^\w{1,30}$/;
        return re.test(employee.idNumber);
    }

    static validFirstName(employee) {
        let re = /^.{1,120}$/;
        return re.test(employee.firstName);
    }

    static validLastName(employee) {
        let re = /^.{1,120}$/;
        return re.test(employee.lastName);
    }
    static validRenumeration(employee) {
        let re = /^\d{1,10}(\.\d{2})?$/;
        return re.test(employee.renumeration);
    }

    static validMinWage(employee) {
        let re = /^\d{1,10}(\.\d{2})?$/;
        return re.test(employee.minWage);
    }

    static validRenumerationReceived(employee) {
        let re = /^\d{1,10}(\.\d{2})?$/;
        return re.test(employee.renumerationReceived);
    }

    static validEmploymentStartDate(employee) {
        let tmpDate = new Date(employee.employmentStart);
        return tmpDate instanceof Date && !isNaN(tmpDate);
    }

    static validEmploymentEndDate(employee) {
        let tmpDate = new Date(employee.employmentEnd);
        return tmpDate instanceof Date && !isNaN(tmpDate);
    }

    static validBankName(employee) {
        let re = /^.{1,120}?$/;
        return re.test(employee.bankName);
    }

    static validAccountNumber(employee) {
        let re = /^\d{1,20}?$/;
        return re.test(employee.accountNumber);
    }

    static validBranchCode(employee) {
        let re = /^\d{1,10}?$/;
        return re.test(employee.branchCode);
    }

    static validPaymentMedium(employee) {
        let valid = [1, 2, 3];
        return valid.includes(employee.paymentMedium)
    }

    static validAccountType(employee) {
        let valid = [1, 2, 3];
        return valid.includes(employee.accountType)
    }
}

export { Employee, ValidateEmployeeUtil };