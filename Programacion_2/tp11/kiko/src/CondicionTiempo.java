public class CondicionTiempo extends Condicion{
    private int unidadTiempo;

    public CondicionTiempo(int unidadTiempo) {
        this.unidadTiempo = unidadTiempo;
    }

    @Override
    public boolean cumple(ElementoKiko e) {
        return e.tiempoTranscurrido() < this.unidadTiempo;
    }    
}
