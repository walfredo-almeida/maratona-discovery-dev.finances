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
