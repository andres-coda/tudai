public class BusquedaCantidadPla extends Busqueda{
    private int cantidadPla;

    public BusquedaCantidadPla(int cantidadPla) {
        this.cantidadPla = cantidadPla;
    }

    @Override
    public boolean cumple(Pieza pieza) {        
        return pieza.getCantidadPla() < this.cantidadPla;
    }


    
}
