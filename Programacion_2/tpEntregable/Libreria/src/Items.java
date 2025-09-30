
import java.util.ArrayList;

public abstract class Items {
  private String id;
  private String nombre;
  private int precio;
  private String autor;
  private String pgainas;
  private String resumen;
  private ArrayList<String> generos;
  static int contador = 0;

  public Items(String nombre, int precio, String autor, String paginas, String resumen,
      ArrayList<String> generos) {
    this.id = "" + contador++;
    this.nombre = nombre;
    this.precio = precio;
    this.autor = autor;
    this.pgainas = paginas;
    this.resumen = resumen;
    this.generos = generos;
  }

  public String getId() {
    return id;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public float getPrecio(Cliente cliente) {
    float descuento = cliente.getDescuento();
    return (precio - precio * descuento);
  }

  public void setPrecio(int precio) {
    this.precio = precio;
  }

  public String getAutor() {
    return autor;
  }

  public void setAutor(String autor) {
    this.autor = autor;
  }

  public String getPgainas() {
    return pgainas;
  }

  public void setPgainas(String pgainas) {
    this.pgainas = pgainas;
  }

  public String getResumen() {
    return resumen;
  }

  public void setResumen(String resumen) {
    this.resumen = resumen;
  }

  public ArrayList<String> getGeneros() {
    ArrayList<String> gen = new ArrayList<>(this.generos);
    return gen;
  }

  public void addGeneros(String genero) {
    this.generos.add(genero);
  }  

  @Override
  public boolean equals(Object obj) {
    Items other = (Items) obj;
    return (!id.equals(other.id));
  }
}
