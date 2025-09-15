/*
 Escribir un programa que mientras el usuario cargue desde
teclado un carácter letra minúscula, llame a un método que
imprime por pantalla la tabla de multiplicar del 9.
*/
public class Ejercicio6 {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        char dato = ingreseLetraMinuscula();
        while (Ejercicio2.esLetraMinuscula(dato)) { 
            tabla9();
            dato = ingreseLetraMinuscula();
        }
        System.out.println("Ingreso una caracter que no corresponde con una letra minuscula");
    }

    public static char ingreseLetraMinuscula() {
        System.out.println("Ingrese una letra minuscula");
        return Utils.leerChar();
    }

    public static void tabla9() {
        for (int i= 1; i <=10; i ++){
            System.out.println("9 * "+i+" = "+(9*i));
        }
    }
}
