import java.util.ArrayList;

public class Seccion extends Categoria {
    ArrayList<Categoria> subSecciones;
    String descripcion;
    String imagen;

    public Seccion(String descripcion, String imagen) {
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.subSecciones = new ArrayList<>();
    }

    public void addContenido(Categoria contenido){
        this.subSecciones.add(contenido);
    }

    public void addContenidoArray(ArrayList<Seccion> lista){
        for (Categoria categoria : lista) {            
            this.addContenido(categoria);
        }
    }

    

    @Override
    public boolean tieneContenido(){
        return this.subSecciones.size() != 0;
    }

    @Override
    public int cantidadContenido() {
        int suma = 0;
        for (Categoria c : subSecciones) {
            suma += c.cantidadContenido();
        }
        return suma;
    }

    @Override
    public Categoria copiar(CondicionNoticias condicion) {
        Seccion categoria = new Seccion(this.descripcion, this.imagen);
        for (Categoria c : subSecciones) {
            Categoria newCategoria = c.copiar(condicion);
            if(newCategoria.tieneContenido()){
                categoria.addContenido(newCategoria);
            }
        }
        if(!categoria.tieneContenido()) return null;
        return categoria;
    }

    @Override
    public String mapa() {
        String newMapa = this.getDescripcion()+"\n";
        for (Categoria categoria : subSecciones) {
            newMapa+="/"+this.getDescripcion()+"/"+categoria.mapa();
        };
        return newMapa;
    }

    public String getDescripcion() {
        return descripcion;
    }

    
}
