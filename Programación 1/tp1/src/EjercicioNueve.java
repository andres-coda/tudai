/*
Escribir un programa que permita el ingreso de un número entero
por teclado e imprima el cociente de la división de dicho número
por 2, 3, y 4. En base a los resultados obtenidos analice cada
caso si es correcto o no. 
*/
public class EjercicioNueve {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        int num1;
        double cocienteDos, cocienteTres, cocienteCuatro;
        //Ingreso de usuario por teclado
        System.out.println("Ingrese un número: ");
        num1=Utils.leerInt();
        //Ejecución de programa
        cocienteDos=num1/2;
        cocienteTres=num1/3;
        cocienteCuatro=num1/4;
        //Salida
        System.out.println("El cociente de el número "+num1+" dividido dos es: "+cocienteDos);
        System.out.println("El cociente de el número "+num1+" dividido tres es: "+cocienteTres);
        System.out.println("El cociente de el número "+num1+" dividido cuatro es: "+cocienteCuatro);
    }
}
