/*
Escribir un programa que declare variables para los tipos int, double,
char y boolean, luego asigne un valor, a cada una, correspondiente
al tipo que tiene la variable, e imprima por pantalla cada una de las
variables.
*/

public class EjercicioUno{
    public static void main(String[] args) {
        System.out.println("");
        System.out.println("Tp 1: Coda Andrés");
        //Definir variables
        int numeroEntero;
        double numeroDecimal;
        char letra;
        boolean booleano;

        //Ingresos de usuarios
        System.out.println("Ingrese un número entero: ");
        numeroEntero = Utils.leerInt();
        System.out.println("Ingrese un número decimal: ");
        numeroDecimal = Utils.leerDouble();
        System.out.println("Ingrese una letra: ");
        letra = Utils.leerChar();
        booleano=true;
        //Acción de programa
        //Salida
        System.out.println("Número entero: "+numeroEntero);
        System.out.println("Número decimal: "+numeroDecimal);
        System.out.println("Letra: "+letra);
        System.out.println("Estado booleano: "+booleano);
    }
}