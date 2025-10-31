public abstract class Elementos {
    private String id;

    public Elementos(String id){
        this.id= id;
    }

    public abstract double calcularValor();
    public abstract int calcularAntiguedad();

    public String getId() {
        return id;
    }    
}
