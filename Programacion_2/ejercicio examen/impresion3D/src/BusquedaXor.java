public class BusquedaXor extends Busqueda{
    private Busqueda b1, b2;

    public BusquedaXor(Busqueda b1, Busqueda b2) {
        this.b1 = b1;
        this.b2 = b2;
    }

    @Override
    public boolean cumple(Pieza pieza) {
        return b1.cumple(pieza)|| b2.cumple(pieza);
    }
    
    
}
