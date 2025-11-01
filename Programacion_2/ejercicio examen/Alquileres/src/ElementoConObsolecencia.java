public class ElementoConObsolecencia extends Elemento {
    private Elemento apuntado;
    private int obsoleto;
    private Calculador calculador;
    private static int divisorOboletoValor = 2;
    private static int divisorObsoletoAlquiler = 3;

    public ElementoConObsolecencia(String id, Elemento apuntado, int obsoleto, Calculador calculador) {
        super(id);
        this.apuntado = apuntado;
        this.obsoleto = obsoleto;
        this.calculador = calculador;
    }

    private boolean estaVencido() {
        return this.getApuntado().getAntiguedad() > this.getObsoleto();
    }

    @Override
    public double calcularAlquiler() {
        if (this.estaVencido()) {
            return this.getApuntado().calcularAlquiler() / divisorObsoletoAlquiler;
        }
        return this.getApuntado().calcularAlquiler();
    }

    @Override
    public double calcularValor() {
        if (this.estaVencido()) {
            return this.getApuntado().calcularValor() / divisorOboletoValor;
        }
        return this.getApuntado().calcularValor();
    }

    @Override
    public int getAntiguedad() {
        return getApuntado().getAntiguedad();
    }

    public Elemento getApuntado() {
        return apuntado;
    }

    public void setApuntado(Elemento apuntado) {
        this.apuntado = apuntado;
    }

    public int getObsoleto() {
        return obsoleto;
    }

    public void setObsoleto(int obsoleto) {
        this.obsoleto = obsoleto;
    }

    public Calculador getCalculador() {
        return calculador;
    }

    public void setCalculador(Calculador calculador) {
        this.calculador = calculador;
    }

}
