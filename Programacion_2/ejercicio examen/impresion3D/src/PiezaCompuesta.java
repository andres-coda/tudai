import java.util.ArrayList;

public class PiezaCompuesta extends Pieza {
  private ArrayList<Pieza> piezas;

  public PiezaCompuesta(String nombre, String descripcion, int cantidadPla, int tiempo) {
    super(nombre, descripcion, cantidadPla, tiempo);
  }

  public void addPieza(Pieza p, Busqueda b) {
    if(b == null || b.cumple(p)){
      this.piezas.add(p);
    }
  }

  public ArrayList<Pieza> getPiezas() {
    ArrayList<Pieza> nuevaPieza = this.piezas;
    return nuevaPieza;
  }

  @Override
  public int getCantidadPla() {
    int cantidad = super.getCantidadPla();
    for (Pieza p : piezas) {
      cantidad += p.getCantidadPla();
    }
    return cantidad;
  }

  @Override
  public ArrayList<String> getListaColores() {
    ArrayList<String> colores = new ArrayList<String>();
    for (Pieza p : piezas) {
      ArrayList<String> color = p.getListaColores();
      for (String c : color) {
        if (!colores.contains(c)) {
          colores.add(c);
        }
      }
    }
    return colores;
  }

  @Override
  public int getTiempo() {
    int tiempo = super.getTiempo();
    for (Pieza p : piezas) {
      tiempo += p.getTiempo();
    }
    return tiempo;
  }

  @Override
  public int cantidadPiezas() {
      int cantidad = 0;
      for (Pieza p : piezas) {
        cantidad+=p.cantidadPiezas();
      }
      return cantidad;
  }

  @Override
  public ArrayList<Pieza> busqueda(Busqueda b) {
    ArrayList<Pieza> piezasBuscadas = new ArrayList<Pieza>();
    for (Pieza pieza : piezas) {
      piezasBuscadas.addAll(pieza.busqueda(b));
    }
    return piezasBuscadas;
  }
  
}
