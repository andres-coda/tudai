/*
Escribir un diseño de programa que mientras que el usuario
ingrese un número distinto de 0, pida ingresar otros dos números
e imprima el resultado de la multiplicación entre los dos últimos
números ingresados.
*/
public class Ejercicio4 {
    public static void main(String[] args) {
        System.out.println("Tp 3: Coda Andrés");
        int dato = Ejercicio1.ingreseNumero();

        while (Ejercicio1.esEnteroDistinto0(dato)) {
            int a = Ejercicio1.ingreseNumero();
            int b = Ejercicio1.ingreseNumero();

            System.out.println("El producto de los últimos dos números es: "+ (a*b));

            dato = Ejercicio1.ingreseNumero();
        }

        System.out.println("Ingreso 0, finalizo el programa");
    }
}
