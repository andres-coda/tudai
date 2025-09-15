/*
 Escribir un programa que permita el ingreso de dos números
enteros por teclado e imprima:
a. si el primero es mayor al segundo.
b. si ambos son múltiplos de 2.
 */
public class EjercicioDiez {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        int num1, num2;
        //Ingreso de usuario por teclado
            System.out.println("Ingrese el primer número:");
            num1=Utils.leerInt();
            System.out.println("Ingrese el segundo número:");
            num2=Utils.leerInt();
        //Ejecución de programa
        if (num1>num2){
            System.out.println("a");            
        } 
        if (num1%2==0&& num2==0){
            System.out.println("b");
        }
        //Salida
    }
}
