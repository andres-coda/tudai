public abstract class Elemento {
    private String id;

    public Elemento(String id){
        this.id= id;
    }

    public abstract double calcularValor();
    public abstract int getAntiguedad();
    public abstract double calcularAlquiler();

    public String getId() {
        return id;
    }    
}
