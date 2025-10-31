public class Alquilables extends Elementos{
    private double valor;
    private int antiguedad;
    private String descripcion;

    public Alquilables(String id, double valor, int antiguedad, String descripcion) {
        super(id);
        this.valor = valor;
        this.antiguedad = antiguedad;
        this.descripcion = descripcion;
    }

    @Override
    public int calcularAntiguedad() {
        return getAntiguedad();
    }

    @Override
    public double calcularValor() {
        return getValor();
    }



    public double getValor() {
        return valor;
    }



    public int getAntiguedad() {
        return antiguedad;
    }



    public String getDescripcion() {
        return descripcion;
    }

    

    
}
