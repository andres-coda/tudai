public class CalculadorFijo extends Calculador{
    private double montoFijo;

    
    public CalculadorFijo(double montoFijo) {
        this.montoFijo = montoFijo;
    }


    @Override
    public double calcular(Elemento elem) {
        return this.getMontoFijo();
    }


    public double getMontoFijo() {
        return montoFijo;
    }


    public void setMontoFijo(double montoFijo) {
        this.montoFijo = montoFijo;
    }    
}
