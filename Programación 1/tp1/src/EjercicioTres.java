/*
 Escribir un programa que declare una constante de tipo int y pida el
ingreso de un valor por teclado (hacer uso de Utils.java). Luego
muestre el valor ingresado. ¿Qué pasa en este caso? ¿Se puede o
surge algún problema?
 */
public class EjercicioTres {
    
    public static void main(String[] args) {
        System.out.println("");
        System.out.println("Tp 1: Coda Andrés");
        //Declaración de variables
        //Ingreso de usuario por teclado
        System.out.print("Ingrese un número entero: ");
        final int constante = Utils.leerInt();
        //Ejecución de programa
        //Salida
        System.out.println("Ingreso el núemero: "+constante);
        System.out.print("Se puede ingresarle un valor a una constante en la delcaración.");
        System.out.print("Funciono sin problemas aparentes.");
    }
}
