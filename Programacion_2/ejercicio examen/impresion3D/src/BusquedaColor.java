public class BusquedaColor extends Busqueda{
    private String color;
    

    public BusquedaColor(String color) {
        this.color = color;
    }


    @Override
    public boolean cumple(Pieza pieza) {
        return pieza.getListaColores().contains(this.color) && pieza.getListaColores().size() ==1;
    }

    
}
