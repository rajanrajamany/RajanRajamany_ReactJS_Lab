
import {useEffect, useState} from "react"
import {getAllExpenseItems} from "../services/expense";
import { ExpenseItems } from "./ExpenseItems";
import {Container} from "react-bootstrap";
import IExpenseItem from "../models/expense";
import { ExpenseByPayee } from "./ExpenseByPayee";
import { ExpenseCreator } from "./ExpenseCreator";

const ExpenseTrackerApp = () => {

  // s1, s2, s3, s4
  const [expenseItems, setExpenseItems] = useState<IExpenseItem[]>([]);

  useEffect( () => {

    const getAllExpenseItemsInvoker =  async () => {

      const response = await getAllExpenseItems();

      console.log(`Response is ` + JSON.stringify(response));

      setExpenseItems(response);
    }

    getAllExpenseItemsInvoker();    

  }, [])

  return (
    <Container>
      <h2> 
        Expense Tracker
      </h2>
        <ExpenseCreator expenseItems={expenseItems}></ExpenseCreator>
        <br></br>
      

      <ExpenseItems expenseItems={expenseItems}></ExpenseItems>
      <ExpenseByPayee expenseItems={expenseItems}></ExpenseByPayee>

    </Container>
  )
}

export {ExpenseTrackerApp}