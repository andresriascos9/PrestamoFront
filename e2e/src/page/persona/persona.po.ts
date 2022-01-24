import { by, element } from 'protractor';

export class PersonaPage {
    private linkCrearPersona = element(by.id('crearPersona'));
    private linkListarPersonas = element(by.id('listarPersonas'));
    private botonGardar = element(by.id('guardarPersona'));
    private inputIdPersona = element(by.id('identificacion'));
    private inputNombreProducto = element(by.id('nombre'));
    private listaPersonas = element.all(by.css('tbody.personas tr'));

    async clickBotonCrearPersonas() {
        await this.linkCrearPersona.click();
    }

    async clickBotonListarPersonas() {
        await this.linkListarPersonas.click();
    }

    async ingresarId(idPersona) {
        await this.inputIdPersona.sendKeys(idPersona);
    }

    async ingresarDescripcion(nombrePersona) {
        await this.inputNombreProducto.sendKeys(nombrePersona);
    }

    async obtenervalorInputNombrePersona(){
        return this.inputNombreProducto.getText();
    }

    async obtenervalorInputIdentificacionPersona(){
        return this.inputIdPersona.getText();
    }

    async clikGuardar() {
        await this.botonGardar.click();
    }

    async contarPersonas() {
        return this.listaPersonas.count();
    }
}
