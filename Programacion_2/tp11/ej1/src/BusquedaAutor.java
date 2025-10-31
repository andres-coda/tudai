public class BusquedaAutor extends CondicionNoticias{
    private String autor;
    

    public BusquedaAutor(String autor) {
        this.autor = autor;
    }

    @Override
    public boolean cumple(Noticia n) {
        return n.getAutor().equals(this.autor);
    }

      
}