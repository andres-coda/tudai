
public class Pelicula extends Items {
  private String nombre;

  public Pelicula(String nombre) {
    setId();
    this.nombre = nombre;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  @Override
  public boolean equals(Object obj) {
    Pelicula other = (Pelicula) obj;
    return (!nombre.equals(other.nombre));
  }

}
