public class CalcularSuma extends Calculador{
    private Calculador c1, c2;

    public CalcularSuma(Calculador c1, Calculador c2) {
        this.c1 = c1;
        this.c2 = c2;
    }

    public Calculador getC1() {
        return c1;
    }

    public void setC1(Calculador c1) {
        this.c1 = c1;
    }

    public Calculador getC2() {
        return c2;
    }

    public void setC2(Calculador c2) {
        this.c2 = c2;
    }

    @Override
    public double calcular(Elemento elem) {
        return this.getC1().calcular(elem) + this.getC2().calcular(elem);
    }

    
}
