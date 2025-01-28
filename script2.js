document.addEventListener('DOMContentLoaded',()=>{
//grab all elemnet 

const expenseForm=document.getElementById('expense-form');
const expenseNameInput=document.getElementById('expense-name');
const expenseAmountInput=document.getElementById("expense-amount");
const expensiveList=document.getElementById('expense-list');
const totalAmountDisplay=document.getElementById('total-amount');

let expenses=JSON.parse(localStorage.getItem('expense'))||[];

renderExpense();

updateAmount();

expenseForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=expenseNameInput.value.trim();
    const amount=parseFloat(expenseAmountInput.value.trim());

    if(name!=="" && !isNaN(amount) && amount>0){
        const newExpense={
            id:Date.now(),
            name:name,
            amount:amount
        }
        expenses.push(newExpense);
        saveExpenseToLocal();
        updateAmount();
        renderExpense();

        expenseAmountInput.value="";
        expenseNameInput.value="";
    }


})

function renderExpense(){
    expensiveList.innerHTML=" ";
    expenses.forEach(expense => {
        const li=document.createElement('li')
        li.innerHTML=`
          ${expense.name} - $${expense.amount}
          <button data-id="${expense.id}">Delete</button>
        `
        
        expensiveList.appendChild(li);

    });
}
function saveExpenseToLocal(){
    localStorage.setItem('expense',JSON.stringify(expenses));

}

function updateAmount(){
    let totalAmount=calculateAmount();
    totalAmountDisplay.textContent=totalAmount;

}
function calculateAmount(){
    return expenses.reduce((sum,expense)=>sum+expense.amount,0);
}

expensiveList.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        const expenseId=parseInt(e.target.getAttribute("data-id"));
     expenses=expenses.filter(expense=>expense.id!==expenseId)

     saveExpenseToLocal();
     renderExpense();
     updateAmount();
    }
})



})