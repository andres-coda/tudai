

/*
 * 1. Sistema de Alquiler
Para evitar convertirse en un nuevo Blockbuster, un videoclub de barrio ha decidido
diversificarse e incorporar a su cartera de negocios el alquiler de autos. Para modernizarse,
abandonará los registros en papel e implementará un sistema unificado de alquiler. El sistema
debe permitir alquilar un determinado ítem a un cliente hasta una fecha determinada y llevar
control de los ítems alquilados a cada cliente. Las películas poseen información filmográfica
y la cantidad de copias que se dispone de la misma. De los vehículos, se registra marca, kms
y patente. Los vehículos pueden ser eléctricos, nafteros o diesel. Una película puede ser
alquilada si hay copias aún disponibles, mientras que los vehículos sólo pueden seralquilados
a un cliente por vez.
Se debe proveer además la funcionalidad necesaria para permitir conocer quiénes son los
clientes que poseen alquileres vencidos.

 */

public class App {
  public static void main(String[] args) {
    VideoClub miVideoClub = new VideoClub();
    Items peli= new Pelicula("No llores por mi Inglaterra");
    Items auto = new Auto("Fiat","0" , "122null", TipoAuto.ELECTRICO);
    Cliente cliente = new Cliente("Juan Perez");

  }
}
 