/*
 Escribir un programa que solicite nombre, edad, altura y ocupación, y
los imprima por pantalla.
 
 */
public class EjercicioCinco {
    public static void main(String[] args) {
        System.out.println("");
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        String nombre, ocupacion;
        int edad;
        double altura;

        //Ingreso de usuario por teclado
        System.out.println("Ingrese nombre: ");
        nombre=Utils.leerString();
        System.out.println("Ingrese su edad: ");
        edad=Utils.leerInt();
        System.out.println("Ingrese su altura: ");
        altura=Utils.leerDouble();
        System.out.println("Ingrese ocupación: ");
        ocupacion=Utils.leerString();

        //Ejecución de programa
        
        //Salida
        System.out.println("Nombre: "+nombre);
        System.out.println("Edad: "+edad);
        System.out.println("Altura: "+altura);
        System.out.println("Ocupación: "+ocupacion);
    }
}
