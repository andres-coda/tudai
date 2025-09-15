/*
 Escribir un programa que permita ingresar 5 números de a uno por
vez y que los muestre por pantalla en orden inverso:
Ejemplo: Ingreso: 23, 4, 2, 100, 3
Se debe mostrar: 3, 100, 2, 4, 23
 */
public class EjercicioCuatro {
    public static void main(String[] args) {
        System.out.println("");
        System.out.println("Tp 1: Coda Andrés");

        //Declaración de variables
        int num1=0, num2=0, num3=0, num4=0, num5=0;
        
        
        //Ingreso de usuario por teclado
        for (int i = 1; i < 6; i++) {
            System.out.println("Ingrese un número para la posición "+i+": ");
            switch (i) {
                case 1 -> num1=Utils.leerInt();
                case 2 -> num2=Utils.leerInt();
                case 3 -> num3=Utils.leerInt();
                case 4 -> num4=Utils.leerInt();
                default -> num5=Utils.leerInt();
            }
        }        
        //Ejecución de programa
        
        //Salida
        for (int i = 5; i >0; i--) {
            switch (i) {
                case 1 -> System.out.println("Número ingresado en la posición "+i+": "+num1);
                case 2 -> System.out.println("Número ingresado en la posición "+i+": "+num2);
                case 3 -> System.out.println("Número ingresado en la posición "+i+": "+num3);
                case 4 -> System.out.println("Número ingresado en la posición "+i+": "+num4);
                default -> System.out.println("Número ingresado en la posición "+i+": "+num5);
            }
        }
    }
}
