/*
Escribir un programa que dado tres números reales ingresados
por el usuario, divida el primero por el segundo y al resultado
obtenido le reste el tercero. Muestre por pantalla el resultado
obtenido. Puede o no usar variables auxiliares para los cálculos.
¿Puede ocurrir algún error?
 */

 public class EjercicioSiete {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        double num1, num2, num3;
        //Ingreso de usuario por teclado
        System.out.println("Ingrese el primer número: ");
        num1=Utils.leerDouble();
        System.out.println("Ingrese el segundo número (debe ser distinto de 0): ");
        num2=Utils.leerDouble();
        while(num2==0){
            System.out.println("El número ingresado debe ser distinto de 0: "); 
            num2=Utils.leerDouble();
        }
        System.out.println("Ingrese el tercer número: ");
        num3=Utils.leerDouble();
        
        //Ejecución de programa
        
        //Salida
        System.out.println("El resultado de el primer número: "+num1+" dividio el segundo número: "+num2+" menos el tercer número: "+num3+" da: ");
        System.out.println(num1/num2-num3);
    }
}
