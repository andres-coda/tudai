public abstract class Nombre {
    private String nombre;

    protected Nombre(String nombre){
        this.nombre = nombre;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    @Override
     public boolean equals(Object obj){
        if( this == obj) return true;
        if (obj == null  || getClass() != obj.getClass()) return false;
        
        Nombre other = (Nombre) obj;
        return (this.getNombre().equals(other.getNombre()));
    }
}
