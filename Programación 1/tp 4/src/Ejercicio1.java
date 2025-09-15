/*
Para los siguientes métodos verificar su funcionamiento por medio
de algunas de las técnicas aprendidas y corregir los errores si
hubiesen:
a. public static int obtenerFactorial(int numero){
 // obtiene el factorial de numero
 int resultado=numero;
 while (numero>0)
 resultado*=--numero;
 return resultado;
}
b. public static int obtenerSumatoria(int natural){
 // obtiene la sumatoria de los primeros n naturales
 int resultado=1;
 while (natural>0)
 resultado+=natural--;
 return resultado;
}
c. public static boolean esPrimo(int numero) {
 // devuelve si es primo el numero o no
 int divisor=2;
 boolean esPrimoNum=true;
 if (numero < 2)
 return false;
 while (divisor < numero && esPrimoNum){
 if (numero%divisor++==0)
 esPrimoNum=true;
 }
 return esPrimoNum;
}
d. public static int buscarMayor(int a, int b, int c) {
// retorna el mayor de los 3 números
 int mayor = a;
 if (b > mayor) {
 mayor = b;
 }
 if (c > mayor) {
 mayor = c;
 }
 return mayor;
}
e. public static int contarDigitos(int n) {
 int contador = 0;
 while (n != 0) {
 n /= 10;
 contador++;
 }
 return contador;
 }
f. public static boolean buscarDigito(int num, int digito) {
// determina si en num está presente un determinado
dígito
 boolean encontrado = false;
 int resto;
 while (num > 0) {
 resto = num % 10;
 if (resto == digito) {
 encontrado = true;
 } else {
 encontrado = false;
 }
 num = num / 10;
 }
 return encontrado;
}
g. public static int divisorComunMaximo(int num1, int num2){
// determina el divisor común máximo de dos número
enteros
 int dcm = 1;
 int divisor = 2;
 while (divisor < num1 && divisor < num2) {
 if (num1 % divisor == 0 && num2 % divisor == 0) {
 dcm = divisor;
 }
 divisor++;
 }
 return dcm;
 }
h. public static String decimalABinario(int num) {
// convierte un número decimal a su representación
binaria
 String binario = "";
 while (num > 0) {
 int resto = num % 2;
 binario = resto + binario;
 num = num / 2;
 }
 return binario;
}

 */

public class Ejercicio1 {
    
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        
        //Ingreso de usuario por teclado
        
        //Ejecución de programa
        
        //Salida
        System.out.println("Salida: ");
    }
}
