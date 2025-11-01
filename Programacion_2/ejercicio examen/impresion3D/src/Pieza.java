import java.util.ArrayList;

public abstract class Pieza {
  private String nombre;
  private String descripcion;
  private int cantidadPla;
  private int tiempo;
  private static double precioGs = 1;
  private static double precioSeg = 1;

  public Pieza(String nombre, String descripcion, int cantidadPla, int tiempo) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tiempo = tiempo;
    this.cantidadPla = cantidadPla;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getDescripcion() {
    return descripcion;
  }

  public void setDescripcion(String descripcion) {
    this.descripcion = descripcion;
  }

  public static double getPrecioGs() {
    return precioGs;
  }

  public static void setPrecioGs(double precioGs) {
    Pieza.precioGs = precioGs;
  }

  public static double getPrecioSeg() {
    return precioSeg;
  }

  public static void setPrecioSeg(double precioSeg) {
    Pieza.precioSeg = precioSeg;
  }

  public void setTiempo(int tiempo) {
    this.tiempo = tiempo;
  }

  public void setCantidadPla(int cantidadPla) {
    this.cantidadPla = cantidadPla;
  }

  public int getTiempo() {
    return this.tiempo;
  }

  public int getCantidadPla() {
    return this.cantidadPla;
  }

  public double costoPieza() {
    double costo = this.getCantidadPla() * Pieza.getPrecioGs() + this.getTiempo() * Pieza.getPrecioSeg();
    return costo;
  }

  public abstract ArrayList<String> getListaColores();
  public abstract int cantidadPiezas();
  public abstract ArrayList<Pieza> busqueda(Busqueda b);

}
