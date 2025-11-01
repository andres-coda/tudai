public class Alquilables extends Elemento{
    private double valor;
    private int antiguedad;
    private String descripcion;
    private Calculador calculador;

    public Alquilables(String id, double valor, int antiguedad, String descripcion, Calculador calculador) {
        super(id);
        this.valor = valor;
        this.antiguedad = antiguedad;
        this.descripcion = descripcion;
        this.calculador = calculador;
    }

    @Override
    public double calcularValor() {
        return getValor();
    }



    @Override
    public double calcularAlquiler() {
        return this.calculador.calcular(this);
    }

    public double getValor() {
        return valor;
    }


    @Override
    public int getAntiguedad() {
        return antiguedad;
    }



    public String getDescripcion() {
        return descripcion;
    }

    

    
}
