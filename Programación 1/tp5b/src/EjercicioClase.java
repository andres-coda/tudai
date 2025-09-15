public class EjercicioClase {
    public static final int MAX = 6;
    public static void main(String[] args) {
        int[] arreglo = {15,8,23,6,25,5};
        System.out.println("Ingrese el número que quiere buscar si hay multiplos: ");
        int x = Utils.leerInt();
        if (esMultiplo(arreglo, x)){
            System.out.println("Existen multiplos en el arreglo");
        } else {
            System.out.println("No hay multiplos en el arreglo");
        }
    }

    public static void subMenu(){
        int x = -1;
        while (x!=0) { 
            System.out.println("Ingrese un número para buscar si hay multiplos o 0 para salir: ");
            x=Utils.leerInt();
            if (x!=0) {
                menuEjercicioClase(x);
            }
        }
    }

    public static void menuEjercicioClase(int x){
        int[] arreglo = {15,8,23,6,25,5};
        
        if (esMultiplo(arreglo, x)){
            System.out.println("Existen multiplos en el arreglo");
        } else {
            System.out.println("No hay multiplos en el arreglo");
        }
    }


    public static boolean esMultiplo(int[] arreglo, int x) {
        int i=0;
        while (i<MAX && arreglo[i] % x != 0) {
            i++;
        }
        return i<MAX;
    }
}
