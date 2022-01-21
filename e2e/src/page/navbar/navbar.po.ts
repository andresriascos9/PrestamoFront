import { by, element } from 'protractor';

export class NavbarPage {
    linkHome = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[1]'));
    linkProducto = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[2]'));
    linkPersonas = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[3]'));
    linkPrestamo = element(by.xpath('/html/body/app-root/app-navbar/nav/div/ul/a[4]'));

    async clickBotonProductos() {
        await this.linkProducto.click();
    }

    async clickBotonPersonas() {
        await this.linkPersonas.click();
    }

    async clickBotonPrestamos() {
        await this.linkPrestamo.click();
    }
}
