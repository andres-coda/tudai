public class BusquedaTitulo extends CondicionNoticias{
    private String titulo;

    public BusquedaTitulo(String titulo) {
        this.titulo = titulo;
    }

    @Override
    public boolean cumple(Noticia n) {
        return n.getTitulo().contains(this.titulo);
    }
}
