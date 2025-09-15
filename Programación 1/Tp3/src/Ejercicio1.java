/*
 Escribir un diseño de programa que mientras que el usuario
ingrese un número distinto de 0, pida ingresar otro número y lo
imprima.

 */

public class Ejercicio1 {
    public static void main(String[] args) {
        System.out.println("Tp 3: Coda Andrés");
        
        //Declaración de variables
        int numeroIngresado;
        //Ingreso de usuario por teclado
        numeroIngresado = ingreseNumero();
        //Ejecución de programa
        while (esEnteroDistinto0(numeroIngresado)){
            System.out.println("Ingreso el número: "+numeroIngresado);
            numeroIngresado = ingreseNumero();
        }
        //Salida
        System.out.println("Finalizó el programa: ");
    }

    public static boolean esEnteroDistinto0(int numero) {
       return ( numero % 1 == 0 && numero != 0);
    }

    public static int ingreseNumero() {
        System.out.println("Ingrese un número");
        return Utils.leerInt();
    }

    public static void salida(int numeroMostrar){
        System.out.println("Ingreso el número: "+numeroMostrar);
    }
}
