/*
Escribir un diseño de programa que mientras que el usuario
ingrese un número natural, pida ingresar otro número cualquiera y
lo imprima.
*/
public class Ejercicio3 {
    public static void main(String[] args) {
        System.out.println("Tp 3: Coda Andrés");
        int dato = Ejercicio1.ingreseNumero();

        while (esNatural(dato)) { 
            dato = Ejercicio1.ingreseNumero();
        }

        System.out.println("Ingreso un número fuera de los números natirales");
    }

    public static boolean esNatural(int numero){
        return (numero %1== 0 && numero > 0);
    }

}
