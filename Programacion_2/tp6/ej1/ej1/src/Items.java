


public abstract class Items {
  private String id;
  private int cantidad;
  static int contador = 0;

  public void setId() {
    this.id=""+contador++;
  }

  public String getId() {
    return id;
  }

  public int getCantidad() {
    return cantidad;
  }

  public void setCantidad(int cantidad) {
    this.cantidad = cantidad;
  }

  public void incrementCantidad(){
    this.cantidad ++;
  }

  public void substractCantidad(){
    if(this.cantidad > 0) {
      this.cantidad --;
    }
  }

}
