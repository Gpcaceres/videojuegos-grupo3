/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Game;

import java.util.Random;

/**
 *
 * @author cxvil
 */
public class RandomGroup {
    // Atributos de la clase.
    private int mLowerLimit;
    private int mUpperLimit;
    private int mRandomNumber;

    // MÃ©todos de la clase.
    // Constructor sin argumentos.     
    public RandomGroup() {
        mLowerLimit = 0;
        mUpperLimit = 0;
        mRandomNumber = 0;
    }

    // FunciÃ³n que obtiene el lÃ­mite inferior de un rango de
    // nÃºmeros aleatorios.
    public int getLowerLimit() {
        return mLowerLimit;
    }

    // FunciÃ³n que inicializa el lÃ­mite inferior de un rango de 
    // nÃºmeros aleatorios.
    public void setLowerLimit(int lowerLimit) {
        this.mLowerLimit = lowerLimit;
    }

    // FunciÃ³n que obtiene el lÃ­mite superior de un rango de 
    // nÃºmeros aleatorios.
    public int getUpperLimit() {
        return mUpperLimit;
    }

    // FunciÃ³n que inicializa el lÃ­mite superior de un rango de 
    // nÃºmeros aleatorios.
    public void setUpperLimit(int upperLimit) {
        this.mUpperLimit = upperLimit;
    }

    // FunciÃ³n que obtiene un nÃºmero aleatorio.
    public int getRandomNumber() {
        return mRandomNumber;
    }

    // FunciÃ³n que inicializa un nÃºmero aleatorio.
    public void setRandomNumber(int randomNumber) {
        this.mRandomNumber = randomNumber;
    }

    // FunciÃ³n que obtiene un nÃºmero aleatorio, dentro de un rango de nÃºmeros.
    public int getRandomNumber(int lowerLimit, int upperLimit) {
        Random number = new Random();
        mLowerLimit = lowerLimit;
        mUpperLimit = upperLimit;
        if (mLowerLimit > mUpperLimit) {
            throw new IllegalArgumentException("El inicio no puede "
                    + "exceder del terminal.");
        }
        // Obtener el rango y convertir a long para evitar 
        // problemas de desbordamiento.
        long range = (long) mUpperLimit - (long) mLowerLimit + 1;
        // Calcular el rango de una fracciÃ³n, 0 <= frac < range
        long fraccion = (long) (range * number.nextDouble());
        mRandomNumber = (int) (fraccion + mLowerLimit);
        return mRandomNumber;
    }

    // FunciÃ³n que imprime un mensaje de control.
    public void PrintMessage(String message) {
        System.out.println(message);
    }

}
