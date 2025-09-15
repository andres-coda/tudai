/*
 Escribir un programa que imprima por pantalla la tabla de verdad
para los operadores lógicos or y and (por separado) para dos
valores booleanos. Utilizar los operadores para calcular el
resultado. Por ejemplo, imprimir el siguiente caso para el operador
or:
false or true es: true
y se genera con:
System.out.println(“ false or true es: ” + (false || true));
 */

public class EjercicioOcho {
    public static void main(String[] args) {
        System.out.println("Tp 1: Coda Andrés");
        
        //Declaración de variables
        boolean p, q, resultado;
        String operador;
        
        //Ingreso de usuario por teclado

        //Ejecución de programa
        for (int i=0; i< 2; i++){
            for (int j = 0; j<4; j++){
                q=p=false;
                if (j%2!=0){
                    q=true;
                } 
                if (j>=2) {
                    p=true;
                }
                if (i==0){
                    operador="or";
                    resultado=p||q;
                } else {
                    operador="and";
                    resultado=p&&q;
                }
                System.out.println("Si "+p+" "+operador+" "+q+" es: "+resultado);
            }
        }

        //Salida
        
    }
}
