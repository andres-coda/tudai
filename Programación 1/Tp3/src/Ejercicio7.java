/*
Escribir un programa que mientras el usuario cargue desde
teclado un número entero distinto de 0, imprima por pantalla la
suma que se obtiene de invocar un método que calcula la
sumatoria de los primeros 200 números naturales (son números
enteros entre 1 y 200).
*/
public class Ejercicio7 {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        int dato = Ejercicio1.ingreseNumero();

        while (Ejercicio1.esEnteroDistinto0(dato)) {
            System.out.println("La sumatoria de los números enteros entre 1 y 200 es: "+sumatoria1a200());
            dato = Ejercicio1.ingreseNumero();
        }

        System.out.println("Ingreso 0 finalizó el programa");
        
    }

    public static int sumatoria1a200(){
        int valor = 0;
        for (int i =1; i <=200; i++){
            valor += i;
        }
        return valor; 
    }
}
