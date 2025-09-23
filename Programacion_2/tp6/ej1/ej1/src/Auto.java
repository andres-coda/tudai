import java.util.ArrayList;

public class Auto extends Items {
  private String marca;
  private String kms;
  private String patente;
  private TipoAuto tipo;

  public Auto(String marca, String kms, String patente, TipoAuto tipo) {
    setId();
    setCantidad(1);
    this.marca = marca;
    this.kms = kms;
    this.patente = patente;
    this.tipo = tipo;
  }

  public String getMarca() {
    return marca;
  }

  public void setMarca(String marca) {
    this.marca = marca;
  }

  public String getKms() {
    return kms;
  }

  public void setKms(String kms) {
    this.kms = kms;
  }

  public String getPatente() {
    return patente;
  }

  public void setPatente(String patente) {
    this.patente = patente;
  }

  public TipoAuto getTipo() {
    return tipo;
  }

  public void setTipo(TipoAuto tipo) {
    this.tipo = tipo;
  }

  public boolean yaEstoy(ArrayList<Items> lista){
    return false;
  }

}
