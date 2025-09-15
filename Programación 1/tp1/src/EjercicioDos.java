/*
 Escribir un programa que declare una variable de tipo double y una
constante de tipo double con valor 1.0. Luego, deberá asignar el
doble del valor de la constante a la variable y mostrar ambos por
pantalla.
 */
public class EjercicioDos {
    public static void main(String[] args) {
        System.out.println("");
        System.out.println("Tp 1: Coda Andrés");
        //declaración de variables
        final double doble=1.0;
        double varDouble;
        //ejecucion de programa
        varDouble = doble;
        //salida
        System.out.println("Variable: "+varDouble);
        System.out.println("Constante: "+doble);
    }
}
