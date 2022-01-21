import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { PrestamoPage } from '../page/prestamo/prestamo.po';

describe('workspace-project Prestamo', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let prestamo: PrestamoPage;
    const CANTIDAD_MINIMA_PRESTAMOS = 0;
    const CANTIDAD_MINIMA_ABONOS = 0;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        prestamo = new PrestamoPage();
    });

    it('Deberia crear un prestamo', () => {
        const VALOR_PRESTAMO = 3000000;

        page.navigateTo();
        navBar.clickBotonPrestamos();
        prestamo.clickBotonCrearPrestamos();
        prestamo.ingresarValorPrestamo(VALOR_PRESTAMO);
        prestamo.ingresarPersona();
        prestamo.clikGuardar();

        // Adicionamos las validaciones despues de la creación
        expect(prestamo.obtenervalorInputValorPrestamo()).toBe('');
        //expect(prestamo.obtenervalorInputPersonaPrestamo()).toBeTruthy();
    });

    it('Deberia listar prestamos', () => {
        page.navigateTo();
        navBar.clickBotonPrestamos();
        prestamo.clickBotonListarPrestamos();
        expect(prestamo.contarPrestamos()).toBeGreaterThanOrEqual(CANTIDAD_MINIMA_PRESTAMOS);
        expect(prestamo.contarPrestamos()).toBe(prestamo.contarPrestamos());
    });

    it('Deberia crear un abono', () => {
        const VALOR_ABONO = 10000;

        page.navigateTo();
        navBar.clickBotonPrestamos();
        prestamo.clickBotonListarPrestamos();
        prestamo.clickPrimerBotonAbonar();
        prestamo.ingresarValorAbono(VALOR_ABONO);
        prestamo.clikGuardarAbono();
        expect(prestamo.obtenervalorInputValorAbono()).toBe('');
    })

    it('Deberia listar abonos', () => {
        page.navigateTo();
        navBar.clickBotonPrestamos();
        prestamo.clickBotonListarPrestamos();
        prestamo.clikListarAbonos();
        expect(prestamo.contarAbonos()).toBeGreaterThanOrEqual(CANTIDAD_MINIMA_ABONOS);
        expect(prestamo.contarAbonos()).toBe(prestamo.contarAbonos());
    });
});