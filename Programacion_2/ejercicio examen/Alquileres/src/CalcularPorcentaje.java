public class CalcularPorcentaje extends Calculador {
    private int porcentaje;    

    public CalcularPorcentaje(int porcentaje) {
        this.porcentaje = porcentaje;
    }

    @Override
    public double calcular(Elemento elem) {
        return elem.calcularValor()*this.getPorcentaje()/100;
    }

    public int getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(int porcentaje) {
        this.porcentaje = porcentaje;
    }
    
}
