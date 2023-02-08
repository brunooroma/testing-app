import Accordion from "./Accordion";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Accordion", () => {

    // Antes de cada test se va a ejecutar el beforeEach, es como un hook
    beforeEach(() => {
        render(
            <Accordion title="Hola">
              <h3>Mi Contenido</h3>
              <p>Algo de texto</p>
            </Accordion>
          );
    })

    // SCREEN se refiere a lo que haya en pantalla renderizado
    // el metodo getByText busca el texto literal que se le indique entre ('')
    // el metodo toBeDefined espera que el elemento este definido (es decir, que lo encuentre), si es asi pasa, sino falla el test
  test('should show title all the time', () => {
    expect(screen.getByText('Hola')).toBeDefined()
  });

  //Se espera que se encuentre la palabra contenido en alguna parte del elemento, si se encuentra el test falla porque se espera que sea NULL (toBeNull)
  //Se usa en el queryByText dentro de los (/expresion regular/i) la i indica que no distinga entre minusculas y mayusculas
  test('should not show the content at the start', () => {
    expect(screen.queryByText(/contenido/i)).toBeNull()
  })

  //Se define el elemento button leyendo si esta el texto Abrir (si dice Cerrar va a fallar el test)
  //Si encuentra el button se dispara el evento click con el fireEvent
  //Se busca el texto que tiene el elemento que desbloqueo el boton
  test('should show the content when the button is clicked', () => {
    const button = screen.getByText(/abrir/i);
    fireEvent.click(button);
    expect(screen.queryByText(/contenido/i)).toBeDefined();
  })

  //Se hace click para abrir el elemento
  //Se hace otro click para cerrar el elemento
  //Se busca el contenido con el queryByText
  test('should hide the content when the button is clicked', () => {
    const button = screen.getByText(/abrir/i);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.queryByText(/contenido/i)).toBeNull();
  })
}); 
