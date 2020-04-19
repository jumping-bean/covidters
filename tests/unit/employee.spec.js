import { shallowMount } from '@vue/test-utils'
import { Employee } from '../../src/model/employee'

describe('Employee.vue',()=>{
    it('converts date object to html date picker value',()=>{
            let employee = new Employee();
            employee.shutFrom = new Date();
            employee.shutFrom.setDate(1);
            employee.shutFrom.setMonth(0);
            employee.shutFrom.setYear(2020);

            let strFrom = employee.getShutdownFromAsString();
            expect(strFrom).toEqual("2020-01-01");

    })
})

describe('Employee.vue',()=>{
  it('converts date object to labour.gov date value',()=>{
          let employee = new Employee();
          employee.shutFrom = new Date();
          employee.shutFrom.setDate(1);
          employee.shutFrom.setMonth(0);
          employee.shutFrom.setYear(2020);

          let strFrom = employee.getShutdownFromAsString(true);
          expect(strFrom).toEqual("01-Jan-2020");

  })
})

describe('Employee.vue',()=>{
  it('converts valid date string (year month day)',()=>{
          let employee = new Employee();
          let vDate1 = employee.convertToDate("2020-01-01");
          let vDate2 = employee.convertToDate("2020/01/01");
          let vDate3 = employee.convertToDate("01-01-2020");
          let vDate4 = employee.convertToDate("01/01/2020");
          let date = new Date(Date.UTC(2020, 0, 1, 0, 0, 0));
          expect(vDate1).toEqual(date);
          expect(vDate2).toEqual(date);
          expect(vDate3).toEqual(date);
          expect(vDate4).toEqual(date);

          let vDate5 = employee.convertToDate("2020-12-31");
          let vDate6 = employee.convertToDate("2020/12/31");

          let date2 = new Date(Date.UTC(2020, 11, 31, 0, 0, 0));
          expect(vDate5).toEqual(date2);
          expect(vDate6).toEqual(date2);
          expect(date2).toEqual(employee.convertToDate(date2));
          expect(date).toEqual(employee.convertToDate(date));
  })
})

describe('Employee.vue',()=>{
  it('rejects invalid dates e.g. day month year etc.',()=>{
  let employee = new Employee();
    const t1 = ()=>{
      employee.convertToDate("32/12/2020");
    };
    const t2 = ()=>{
      employee.convertToDate("string");
    };
    const t3 = ()=>{
      employee.convertToDate(1000);
    };
    const t4 = ()=>{
      employee.convertToDate("31-12-2020");
    };
    const t5 = ()=>{
      employee.convertToDate("31/12/2020");
    };

    expect(t1).toThrow("invalid date");    
    expect(t2).toThrow("invalid date");    
    expect(t3).toThrow("invalid date");    
    expect(t4).toThrow("invalid date");    
    expect(t5).toThrow("invalid date");    
  })
});

describe('Employee.vue',()=>{
  it('empty constructor should reuslt in a valid employee with default value',()=>{
          let employee = new Employee();
          expect(employee.shutdownTo).toEqual("30-Apr-2020");
  })
})



describe('Employee.vue',()=>{
  it('shutdownFrom/shutdownTo property format to be valid',()=>{
          let employee = new Employee(1,'000000/3',new Date('2020-04-01'),new Date('2020-04-30'),'Demo');
          //expect(employee.shutdownFrom).toEqual("01-apr-2020");
          expect(employee.shutdownTo).toEqual("30-Apr-2020");
  })
})

