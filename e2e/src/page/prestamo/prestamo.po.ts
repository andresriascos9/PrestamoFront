import { by, element } from 'protractor';

export class PrestamoPage {
    private linkCrearPrestamo = element(by.id('crearPrestamo'));
    private linkListarPrestamos = element(by.id('listarPrestamo'));
    private botonGuardar = element(by.id('guardarPrestamo'));
    private inputValorPrestamo = element(by.id('valorPrestamo'));
    private inputPersonaPrestamo = element(by.id('persona'));
    private listaPrestamos = element.all(by.css('tbody.prestamos tr'));
    private listaPersonas = element.all(by.tagName('option'));
    private botonAbonar = element(by.buttonText('Abonar'));
    private botonListarAbonos = element(by.buttonText('Ver Abonos'));
    private inputValorAbono = element(by.id('valorAbono'));
    private botonGuardarAbono = element(by.id('guardarAbono'));
    private listaAbonos = element.all(by.css('tbody.abonos tr'));

    async clickBotonCrearPrestamos() {
        await this.linkCrearPrestamo.click();
    }

    async clickBotonListarPrestamos() {
        await this.linkListarPrestamos.click();
    }

    async ingresarValorPrestamo(valorPrestamo) {
        await this.inputValorPrestamo.sendKeys(valorPrestamo);
    }

    async ingresarPersona(){
        if (await this.inputPersonaPrestamo.all(by.tagName('option')).count() > 0){
            await this.inputPersonaPrestamo.all(by.tagName('option')).then((options) => {
                options[2].click();
            });
        }
    }

    async obtenervalorInputValorPrestamo(){
        return this.inputValorPrestamo.getText();
    }

    async obtenervalorInputPersonaPrestamo(){
        return this.inputPersonaPrestamo.getText();
    }

    async clikGuardar(){
        await this.botonGuardar.click();
    }

    async contarPrestamos(){
        return this.listaPrestamos.count();
    }

    async contarPersonas(){
        return this.listaPersonas.count();
    }

    async clickPrimerBotonAbonar(){
        if (await this.botonAbonar.isPresent()){
            await this.botonAbonar.click();
        }
    }

    async ingresarValorAbono(valorAbono){
        if (await this.inputValorAbono.isPresent() && await this.inputValorAbono.isDisplayed()){
            await this.inputValorAbono.sendKeys(valorAbono);
        }
    }

    async clikGuardarAbono(){
        if (await this.botonGuardarAbono.isPresent() && await  this.botonGuardarAbono.isDisplayed()){
            await this.botonGuardarAbono.click();
        }
    }

    async obtenervalorInputValorAbono(){
        if (await this.inputValorAbono.isPresent() && await  this.inputValorAbono.isDisplayed()){
            return this.inputValorAbono.getText();
        }else{
            return '';
        }
    }

    async clikListarAbonos(){
        if (await this.botonListarAbonos.isPresent()){
            await this.botonListarAbonos.click();
        }
    }

    async contarAbonos(){
        return this.listaAbonos.count();
    }
}
