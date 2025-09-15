/*
 Escribir un diseño de programa que mientras que el usuario
ingrese un carácter dígito o carácter letra minúscula, imprima
dicho carácter, y si es carácter letra minúscula, imprima si es vocal
o consonante.

 */
public class Ejercicio2 {
    public static void main(String[] args) {
        System.out.println("Tp 3: Coda Andrés");
        char dato = ingreseDigito();
        while (esLetraMinuscula(dato) || esEntero(dato)) {
            System.out.println("El caracter ingresado es: "+dato);
            if (esLetraMinuscula(dato)) {
                esVocal(dato);
            }
            dato = ingreseDigito();
        }
        System.out.println("Ingreso un caracter que no es ni letra minuscula ni digito. Termino el programa");
    }

    public static char ingreseDigito() {
        System.out.println("Ingrese una letra minuscula o un digito");
        return Utils.leerChar();
    }

    public static boolean esLetraMinuscula(char digito){
        return (digito >= 'a' && digito <= 'z');
    }

    public static boolean esEntero(char numero) {
        return ( numero >= '0' && numero <= '9');
    }

    public static void esVocal(char letra) {
        switch ( letra ) {
            case 'a', 'e', 'i', '0', 'u' -> System.out.println("El digito ingresado es una vocal");
            default -> System.out.println("El digito ingresado es una consonante");
        }
    }
}
