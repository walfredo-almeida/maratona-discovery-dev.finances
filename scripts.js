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
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    //console.log(localStorage)
    },
    set(transactions) {
        localStorage.setItem("finances:transactions", JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction){
        Transaction.all.push(transaction)
        //console.log(transaction)
        App.reload()
    },
    remove(index){
        Transaction.all.splice(index,1)
        App.reload()
    },
    incomes(){
        let income = 0;
        //pegar todas transac
        //para cada transacao
        Transaction.all.forEach(transaction =>{
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
        Transaction.all.forEach(transaction =>{
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
    },
        
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction,index)
        tr.dataset.index = index
        //console.log(tr.innerHTML)
        DOM.transactionsContainer.appendChild(tr)
    
    },
    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
       
        const html = `        
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transacao">
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

    },
    cleartransacions(){
        DOM.transactionsContainer.innerHTML = ""
    }

}

const Utils = {
    formatDate(date ){
        const splittedDate = date.split("-")
        console.log ( `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`)
        
        return ( `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`)
        
    },
    formatAmount(value){
        console.log(value)
       // value = Number(value) * 100
        value = Number(value.replace(/\,\./g, "")) * 100
         return value
    },
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

const Form ={    
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

   

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
            
        }
    
    },
    validateFields(){
        const {description, amount, date} = Form.getValues()
        
        if (  description.trim() == "" || 
              amount.trim() == "" ||
              date.trim() == ""
            ) {
                throw new Error ("Por favor preencha todos campos")

        }

    },
    formatValues(){
        let {description, amount, date} = Form.getValues()
          
         amount = Utils.formatAmount(amount)

         date = Utils.formatDate(date)

         return {
             description,
             amount,
             date
         }       

    },
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""

    },

    saveTransaction(transaction){
        Transaction.add(transaction)

    },
    submit(event){
        event.preventDefault()
        //console.log(event)

        try {
            Form.validateFields()
            //formatar os dados para salvar
            const transaction = Form.formatValues()
            //salvar
            Form.saveTransaction(transaction)
           // Transaction.add(transaction)
            //apagar os dados do formulario
            Form.clearFields()
            //modal feche
            Modal.close()
            //atualizar a aplicacao
           // App.reload()
            
        } catch (error) {
            alert(error.message)
            
        }

       
    }

}

const App = {
    init(){
        /*
        Transaction.all.forEach(function(transaction){
            DOM.addTransaction(transaction)
        })  */
        /*
        Transaction.all.forEach((transaction,index) => {
            DOM.addTransaction(transaction, index)
        })   */

        Transaction.all.forEach(DOM.addTransaction)  
        
        DOM.updateBalance()

        Storage.set(Transaction.all)
      
    },
    reload(){
        DOM.cleartransacions()
        App.init()
    },
}

App.init()

