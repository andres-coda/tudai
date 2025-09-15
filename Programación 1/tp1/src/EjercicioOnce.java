/*
 Escribir un programa que permita el ingreso de un número entero
por teclado e imprima el resultado de determinar:
a. si es múltiplo de 6 y de 7,
b. si es mayor a 30 y múltiplo de 2, o es menor igual a 30,
c. si el cociente de la división de dicho número por 5 es mayor
que 10.
 */
public class EjercicioOnce {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        int num1;

        //Ingreso de usuario por teclado
        System.out.println("Ingrese el primer número:");
        num1=Utils.leerInt();
    
        //Ejecución de programa
        //Salida
        if (num1%6==0 && num1%7==0){
            System.out.println("a");
        }
        if (num1%2==0||num1<=30){
            System.out.println("b");
        }
        if (num1/5>10){
            System.out.println("c");
        }
    }
}
