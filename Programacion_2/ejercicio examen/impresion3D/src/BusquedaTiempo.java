public class BusquedaTiempo extends Busqueda{
    private int tiempo;

    public BusquedaTiempo(int tiempo) {
        this.tiempo = tiempo;
    }

    @Override
    public boolean cumple(Pieza pieza) {
        return pieza.getTiempo()> this.tiempo;
    }

    
}