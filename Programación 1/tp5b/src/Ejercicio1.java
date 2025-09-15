/*
 1. Compresión de imagen
Un dispositivo que toma imágenes de un fenómeno natural está corriendo sobre una plataforma tecnológica
con recursos limitados. Cada imagen (representada por una matriz de NxM) está compuesta por píxeles con
valores entre 0 y 255. Se desea implementar un algoritmo de compresión que comprima aquellas porciones
de la imagen distintas del color negro (0 en la escala de valores del pixel). Se debe implementar la solución
para un arreglo (luego dicha solución se reutilizará en un futuro para cada fila de la matriz). Para ello, se pide
realizar un programa en JAVA que, dado un arreglo de tamaño M, para cada secuencia delimitada por uno o
mas pixeles de color negro (valor 0) con más de X repeticiones de un valor de píxel (todos los elementos de la
secuencia deben ser iguales), comprima la secuencia poniendo en la primera posición el valor negado de la
cantidad de ocurrencias y a continuación el valor del pixel que se repite. El arreglo empieza y termina con un
separador 0 (color negro). Implementar usando las buenas prácticas de programación estructurada vistas en
la cátedra
 */
public class Ejercicio1 {
    public static void submenu(int[][] imagen, int maxF, int maxC){
        mostrarImagen(imagen, maxF, maxC);
        comprimirImagen(imagen, maxF, maxC);
        mostrarImagen(imagen, maxF, maxC);
        Menu.pausarConsola();
    };

    public static void mostrarImagen(int[][] imagen, int maxF, int maxC){
        for(int i=0; i<maxF; i++){
            mostrarArreglo(imagen[i], maxC);
        }
    }

    public static void mostrarArreglo(int[] ar, int max){
        for(int i=0; i<max; i++){
            System.out.print(" "+ar[i]+" -");
        }
        System.out.println("");
    }

    public static void comprimirImagen(int[][] img, int maxF, int maxC){
        for(int i=0; i<maxF; i++){
            comprimirArreglo(img[i],maxC);
        }

    }
    
    public static void comprimirArreglo(int[] ar, int max){
        int fin=0;
        while(fin<max){
            int inicio=inicioSecuencia(ar, max, fin);
            fin=finSecuencia(ar, max, inicio);   
            int cantidad = concurrencia(ar, fin, inicio);
            if(cantidad>1 && cantidad==(fin-inicio+1)){
                comprimirSecuencia(ar, inicio, fin, max, cantidad);
                fin=finSecuencia(ar, max, inicio);
            }
            fin++;
        }
    }

    public static void comprimirSecuencia(int ar[], int inicio, int fin, int max, int cantidad){
        ar[inicio]=0-cantidad;
        for(int i=inicio+2; i<=fin; i++){
            correrIzquierda(ar, i, max);
        }
    }

    public static int concurrencia(int[] ar, int fin, int inicio){
        if (inicio>=fin) return 0;
        int pixel=ar[inicio];
        int i=0;
        while((i+inicio)<=fin && pixel==ar[i+inicio]){
            i++;
        }
        return i;
    }

    public static void correrIzquierda(int[] ar, int pos, int max){
        for(int i=pos; i<max-1; i++){
            ar[i]=ar[i+1];
        }
    }

    public static int inicioSecuencia(int[] ar, int max, int pos){
        int i=pos+1;
        while(i<max && ar[i]==0){
            i++;
        }
        return i;
    }

    public static int finSecuencia(int[] ar, int max, int inicio){
        int i=inicio;
        while(i<max && ar[i]!=0){
            i++;
        }
        return i-1;
    }
}
