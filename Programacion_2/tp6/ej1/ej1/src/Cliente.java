public class Cliente {
    private String id;
    private String nombre;
    static int contador =0;

    public Cliente(String nombre){
        this.id= ""+ contador++;
        this.nombre = nombre;
    }
}