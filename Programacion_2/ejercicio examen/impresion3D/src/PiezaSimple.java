import java.util.ArrayList;

public class PiezaSimple extends Pieza {
  private String color;

  public PiezaSimple(String nombre, String descripcion, int cantidadPla, String color, int tiempo) {
    super(nombre, descripcion, tiempo, cantidadPla);
    this.color = color;
  }

  @Override
  public ArrayList<String> getListaColores() {
    ArrayList<String> colores = new ArrayList<String>();
    colores.add(this.getColor());
    return colores;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  @Override
  public int cantidadPiezas() {
    return 1;
  }

  @Override
  public ArrayList<Pieza> busqueda(Busqueda b) {
    ArrayList<Pieza> piezaBusqueda = new ArrayList<Pieza>();
    if(b.cumple(this)){
      piezaBusqueda.add(this);
    }
    return piezaBusqueda;
  }  
}
