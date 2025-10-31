public class BusquedaTexto extends CondicionNoticias{
    private int tamanoTexto;

    

    public BusquedaTexto(int tamanoTexto) {
        this.tamanoTexto = tamanoTexto;
    }

    @Override
    public boolean cumple(Noticia n) {
        return n.largoTexto() <= this.tamanoTexto;
    }
    
}
