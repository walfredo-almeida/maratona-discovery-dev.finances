const Modal = {
    open(){
        //abri modal
        //adicionar a class ative modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')

    },
    close(){
        //fechar o modal
        //remover a class active do modal
    }
}

const transactions = [
    {
    id:1,
    description: 'Luz',
    amount:-50000,
    date: '23/01/2021'
    },
    {
     id:2,
    description: 'Website',
    amount:500000,
    date: '23/01/2021'
    },
    {
     id:3,
    description: 'Internet',
    amount:-20000,
    date: '23/01/2021'
    },
    {
     id:4,
    description: 'APP',
    amount:40000,
    date: '23/01/2021'
    }
]

const Transaction = {
    incomes(){
        let income = 0;
        //pegar todas transac
        //para cada transacao
        transactions.forEach(transaction =>{
            //se ela for maior que zero
            if(transaction.amount > 0){
                //somar a variavel e retornar a varialve
                income += transaction.amount
            }
        })
        return income;
    },
    expenses(){
        let expense = 0;
        //pegar todas transac
        //para cada transacao
        transactions.forEach(transaction =>{
            //se ela for menor que zero
            if(transaction.amount < 0){
                //somar a variavel e retornar a varialve
                expense += transaction.amount
            }
        })
        return expense;
    },
    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
        
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
       
        //console.log(tr.innerHTML)
        DOM.transactionsContainer.appendChild(tr)
    
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
       
        const html = `        
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transacao">
        </td>
        
        `
        return html
    },
    updateBalance(){
        document
        .getElementById('incomeDisplay')
        .innerHTML= Utils.formatCurrency(Transaction.incomes())

        document
        .getElementById('expenseDisplay')
        .innerHTML= Utils.formatCurrency(Transaction.expenses())

        document
        .getElementById('totalDisplay')
        .innerHTML= Utils.formatCurrency(Transaction.total())

    }

}

const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
       
        value = String(value).replace(/\D/g,"")
        value = Number(value) / 100
        value = value.toLocaleString("pt-br",{
            style: "currency",
            currency:"brl"
        })
       
       // console.log(signal + value)
       return signal + value

    }

}


transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()