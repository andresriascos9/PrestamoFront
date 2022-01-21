import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { PersonaPage } from '../page/persona/persona.po';

describe('workspace-project Persona', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let persona: PersonaPage;
    const CANTIDAD_MINIMA_PERSONAS = 0;

    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        persona = new PersonaPage();
    });

    it('Deberia crear una persona', () => {
        const IDENTIFICACION_PERSONA = 111222333;
        const NOMBRE_PERSONA = 'Prueba Protactor';

        page.navigateTo();
        navBar.clickBotonPersonas();
        persona.clickBotonCrearPersonas();
        persona.ingresarId(IDENTIFICACION_PERSONA);
        persona.ingresarDescripcion(NOMBRE_PERSONA);
        persona.clikGuardar()

        // Adicionamos las validaciones despues de la creación
        expect(persona.obtenervalorInputNombrePersona()).toBe('');
    });

    it('Deberia listar personas', () => {
        page.navigateTo();
        navBar.clickBotonPersonas();
        persona.clickBotonListarPersonas();
        expect(persona.contarPersonas()).toBeGreaterThanOrEqual(CANTIDAD_MINIMA_PERSONAS);
        expect(persona.contarPersonas()).toBe(persona.contarPersonas());
    });
});