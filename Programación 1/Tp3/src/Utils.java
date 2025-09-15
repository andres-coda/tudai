import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Utils {

    /**
     * Función que lee un número entero desde teclado
     * @return Número entero ingresado por el usuario
     */
    public static int leerInt() {
        int numero = 0;
        boolean esValido = false;
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        
        while (!esValido) {
            try {
                numero = Integer.valueOf(entrada.readLine());
                esValido = true;
            } catch (Exception exc) {
                System.out.println("Ocurrió un error, vuelva a intentarlo:");
            }
        }

        return numero;
    }

    /**
     * Función que lee un número decimal (double) desde teclado
     * @return Número decimal ingresado por el usuario
     */
    public static double leerDouble() {
        double numero = 0.0;
        boolean esValido = false;
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        
        while (!esValido) {
            try {
                numero = Double.valueOf(entrada.readLine());
                esValido = true;
            } catch (Exception exc) {
                System.out.println("Ocurrió un error, vuelva a intentarlo:");
            }
        }
        
        return numero;
    }

    /**
     * Función que lee una cadena de caracteres (String) desde teclado
     * @return String ingresado por el usuario
     */
    public static String leerString() {
        String cadena = "";
        boolean esValido = false;
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        
        while (!esValido) {
            try {
                cadena = entrada.readLine();
                esValido = true;
            } catch (Exception exc) {
                System.out.println("Ocurrió un error, vuelva a intentarlo:");
            }
        }
        
        return cadena;
    }

    /**
     * Función que lee una cadena de caracteres (String) desde teclado
     * @return String ingresado por el usuario
     */
    public static char leerChar() {
        char car = ' ';
        boolean esValido = false;
        BufferedReader entrada = new BufferedReader(new InputStreamReader(System.in));
        
        while (!esValido) {
            try {
                car = entrada.readLine().charAt(0);
                esValido = true;
            } catch (Exception exc) {
                System.out.println("Ocurrió un error, vuelva a intentarlo:");
            }
        }
        
        return car;
    }

}
