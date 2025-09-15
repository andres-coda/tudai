public class Menu {
    private static final int MAXF = 10;
    private static final int MAXC = 20;
    private static final int[][] IMAGEN ={
    {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 0},
    {0, 4, 4, 4, 4, 4, 4, 4, 4, 0, 5, 0, 7, 0, 1, 1, 1, 1, 1, 0},
    {0, 0, 2, 2, 0, 5, 0, 9, 9, 9, 0, 3, 0, 6, 0, 0, 4, 4, 0, 0},
    {0, 7, 0, 8, 8, 8, 0, 1, 0, 5, 5, 0, 0, 3, 3, 3, 3, 0, 6, 0},
    {0, 1, 2, 0, 0, 3, 4, 4, 0, 5, 0, 6, 6, 0, 7, 7, 0, 0, 8, 0},
    {0, 0, 9, 0, 1, 1, 1, 0, 2, 0, 3, 3, 0, 4, 0, 5, 5, 0, 0, 6},
    {0, 7, 7, 7, 0, 8, 0, 9, 9, 0, 0, 1, 0, 2, 2, 0, 3, 0, 4, 0},
    {0, 5, 0, 6, 6, 6, 0, 7, 7, 0, 0, 8, 0, 9, 0, 1, 1, 0, 2, 0},
    {0, 3, 0, 4, 4, 0, 0, 5, 5, 5, 0, 6, 0, 7, 7, 0, 8, 0, 9, 0},
    {0, 1, 1, 1, 0, 2, 0, 3, 3, 0, 4, 0, 5, 0, 6, 6, 0, 0, 7, 0}
};
    public static void main(String[] args) {
        int nuMenu = -1;
        while (nuMenu!=0) {  
            limpiarConsola();           
            System.out.println("------------------------------------------------");
            System.out.println("--                                            --");
            System.out.println("------------- Trabajo Práctico n° 5b -----------");
            System.out.println("--                                            --");
            System.out.println("--  1) Comprimir imágen                       --");
            System.out.println("--  2) Calcular promedio                      --");
            System.out.println("--  3) Mayor que el promedio                  --");
            System.out.println("--  4) Buscar elemento                        --");
            System.out.println("--  5) Invertir arreglo                       --");
            System.out.println("--  6) Contar pares                           --");
            System.out.println("--  7) Modificación especifica                --");
            System.out.println("--  8) ¿Esta ordenado ascendente?             --");
            System.out.println("--  9) ¿Hay repetidos?                        --");
            System.out.println("-- 10) Cantidad de n° primos                  --");
            System.out.println("-- 11) Existen todos                          --");
            System.out.println("-- 12) Sumatoria de posiciones                --");
            System.out.println("-- 13) Vocales y consonantes                  --");
            System.out.println("-- 14) Posiciones vocal y pos. consonantes    --");
            System.out.println("-- 15) Corrimiento derecha                    --");
            System.out.println("-- 16) Corrimiento izquierda                  --");
            System.out.println("-- 17) Número inicial                         --");
            System.out.println("-- 18) Eliminar elemento                      --");
            System.out.println("-- 19) Eliminar todas las concurrencias       --");
            System.out.println("-- 21) Incertar numero ordenado               --");
            System.out.println("-- 22) Eliminar todos los n° pares            --");
            System.out.println("--                                            --");
            System.out.println("------------------  Secuencia ------------------");
            System.out.println("-- 23) Inicio y fin de secuencia              --");
            System.out.println("-- 24) Inicio mayor secuencia                 --");
            System.out.println("-- 25) Inicio y fin de anteultima secuencia   --");
            System.out.println("-- 26) Inicio y fin de mayor secuencia        --");
            System.out.println("-- 27) Eliminar sec por cantidad de elementos --");
            System.out.println("-- 28) Eliminar sec coincidentes              --");
            System.out.println("-- 29) Eliminar sec de orden descendente      --");
            System.out.println("-- 30) Reemplazar sec coincidentes            --");
            System.out.println("-- 31) Invertir la ultima secuencia           --");
            System.out.println("-- 32) Primera secuencia a partir de posición --");
            System.out.println("-- 33) Copia en nuevo arreglo sec continuas   --");
            System.out.println("--  0) Salir                                  --");
            System.out.println("--                                            --");
            System.out.println("------------------------------------------------");
            System.out.println("");
            System.out.print("-- Ingresa un número: ");
            nuMenu=Utils.leerInt();
            seleccionMenu(nuMenu);
        }

    }

    private static void seleccionMenu(int nuMenu){
        limpiarConsola();
        switch (nuMenu) {
            case 1 -> Ejercicio1.submenu(IMAGEN,MAXF,MAXC);
            case 40 -> EjercicioClase.subMenu();
            default -> System.out.println("Finalizó el programa");
        }
    }

    public static void limpiarConsola() {
        System.out.print("\033[H\033[2J");
        System.out.flush();
    }

    public static void pausarConsola(){
        System.out.println("");
        System.out.println("Presione cualquier caracter para continuar...");
        char x = Utils.leerChar();
    }
}
