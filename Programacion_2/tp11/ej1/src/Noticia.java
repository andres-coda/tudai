import java.util.ArrayList;

public class Noticia extends Categoria {
    String titulo;
    ArrayList<String> palabraClave;
    String introduccion;
    String texto;
    String autor;
    String linck;

    public Noticia(String titulo, ArrayList<String> palabraClave, String introduccion, String texto, String autor,
            String linck) {
        this.titulo = titulo;
        this.palabraClave = palabraClave;
        this.introduccion = introduccion;
        this.texto = texto;
        this.autor = autor;
        this.linck = linck;
    }

    public int largoTexto(){
        return this.texto.length();
    }


    
    @Override
    public int cantidadContenido() {
        return 1;
    }

    @Override
    public Categoria copiar(CondicionNoticias condicion) {
        if(condicion.cumple(this)){
            Noticia newNoticia = new Noticia(this.titulo, this.palabraClave, this.introduccion, this.texto, this.autor,this.linck);
            return newNoticia;
        }
        return null;
    }

    @Override
    public boolean tieneContenido() {
        return false;
    }


    public String getTitulo() {
        return titulo;
    }


    public ArrayList<String> getPalabraClave() {
        ArrayList<String> newString = this.palabraClave; 
        return newString;
    }


    public String getIntroduccion() {
        return introduccion;
    }


    public String getTexto() {
        return texto;
    }


    public String getAutor() {
        return autor;
    }


    public String getLinck() {
        return linck;
    }

    @Override
    public String mapa() {
        return getLinck()+"\n";
    }

    

    

    
}
