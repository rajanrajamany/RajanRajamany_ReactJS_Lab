
// access to expense-items [add the type]
// Get the list of unique payee names [Rahul, Ramesh]
// Get the contributing amount for a given payee (payee name)
// Get the total expense
// Table to show the data

// Include this component in the ExpenseTrackerApp

import {Table} from "react-bootstrap"; 
import IExpenseItem from "../models/expense";
import {getAllPayeeNames} from "../services/expense";


type ExpenseByPayeeModel = {

  expenseItems : IExpenseItem[];
}

const ExpenseByPayee = ({expenseItems} : ExpenseByPayeeModel) => {
  let localMaxPayee='';
  let localPendingAmount=0;
  const getTotalExpenseByPayee = (payeeName : string) => {

    let totalExpense = 0;
    expenseItems.forEach( (localExpenseItem) => {

      let localPayeeName = localExpenseItem.payeeName;
      if (localPayeeName === payeeName){

        totalExpense = totalExpense + 
        localExpenseItem.price;
      }
    })

    return totalExpense;
  }

  const getGrandTotal = () => {

    let totalExpense = 0;
    expenseItems.forEach( (localExpenseItem) => {


        totalExpense = totalExpense + 
        localExpenseItem.price;
    })

    return totalExpense;
  }

  const getPayeeMax = () => {

    let lclPayee,[]=getAllPayeeNames(expenseItems);
    
    let totalExpense = 0;
    expenseItems.forEach( (localExpenseItem) => {


        totalExpense = totalExpense + 
        localExpenseItem.price;
    })

    return totalExpense;
  }


  const getPendingAmount = (payeeName : string) => {

    const totalExpense = getGrandTotal();
    const totalExpenseByPayee = getTotalExpenseByPayee(payeeName);

    const halfAmount = totalExpense / 2;

    if (totalExpenseByPayee >= halfAmount){
      localMaxPayee=payeeName;
      return 0;
    }else{
      localPendingAmount=halfAmount - totalExpenseByPayee;
      return (halfAmount - totalExpenseByPayee);
    }

    // scenario-1
    // rahul ramesh
    // total expenses = 700
    // rahul - 100

    //
    // 700 - 350 / 350
    // rahul - 350 
    //       - 100

    // 250

    // rahul ramesh
    // total expenses = 700
    // rahul - 410

    //
    // 700 - 350 / 350
    // rahul - 410 
    //       - 350

    // -60

  }

  return (
    <div>

  <Table>
    <thead></thead>
    <tbody>
      <tr>
        <td width="30%">
  <Table width="40%" striped bordered hover >
      <thead >
{/*        <tr>
          <th>#</th>
          <th>Payee Name</th>
          <th>Contributed Amount</th>
          <th>Pending Amount</th>
        </tr>
  */}        
      </thead>

      <tbody >

      <tr >
            <td width="30%">Grand Total</td>
            <td>{getGrandTotal()}</td>

        </tr>

        {

        getAllPayeeNames(expenseItems).map( (payeeName, index) => {
          getPendingAmount(payeeName);
          return (

            <tr>
            <td>{payeeName}</td>
            <td>{getTotalExpenseByPayee(payeeName)}</td>
       
            </tr>
    
          )
        })
        }

<tr>
  <td>Pay&nbsp;{localMaxPayee}</td>
  <td>{localPendingAmount}</td>
</tr>
      </tbody>
    </Table>
    </td>    
    <td></td>
    </tr>
    
    </tbody>
    </Table>
    </div>

    
  )
}

export {ExpenseByPayee}