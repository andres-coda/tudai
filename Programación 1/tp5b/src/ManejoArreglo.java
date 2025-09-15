public class ManejoArreglo {
    public static void comprobarArreglo(int[] arreglo,int MAX){
        if (!estaVacioArreglo(arreglo, MAX)){
            cargarArreglo(arreglo, MAX);
        }
    }
    
    public static boolean estaVacioArreglo(int[] arreglo,int MAX){
        int i = 0;
        while(i<MAX && arreglo[i] !=0){
            i++;
        }
        return !(i<MAX);
    }

    public static void cargarArreglo(int[] arreglo, int max){
        for (int i=0; i<max; i++){
            arreglo[i]=(int)(Math.random()*100);
        }
    }

    public static void cargarArregloLimitado(int[] arreglo, int max, int limite) {
        for (int i=0; i<max; i++){
            arreglo[i] = (int)(Math.random() * limite) + 1;
        }
    }

    public static void cargarArregloChar(char[] arreglo, int max){
        for (int i=0; i<max; i++){
            System.out.println("Ingrese un caracter: ");
            arreglo[i] = Utils.leerChar();
        }
    }

    public static void mostrarArregloChar(char[] arreglo, int max){
        System.out.println("El arreglo quedo cargado de este modo: ");
        for (int i=0; i<max; i++){
            if (arreglo[i]!=' '){
                System.out.print(arreglo[i]);
                if(i<max-1){
                    System.out.print(" - ");
                }
            }
        }
        System.out.println("");
    }

    public static void limpiarArregloChar(char[] arreglo, int max){
        for (int i=0; i<max; i++){
            arreglo[i]=' ';
        } 
    }
}
