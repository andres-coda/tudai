
import java.util.ArrayList;

public class Libreria {
  private ArrayList<Cliente> clientes;
  private ArrayList<Items> inventario;

  public Libreria() {
    ArrayList<Cliente> newCliente = new ArrayList<>();
    ArrayList<Items> newInvent = new ArrayList<>();
    this.clientes = newCliente;
    this.inventario = newInvent;
  }

  public ArrayList<Cliente> getClientes() {
    ArrayList<Cliente> newCliente = new ArrayList(this.clientes);
    return newCliente;
  }

  public void addClientes(Cliente cliente) {
    this.clientes.add(cliente);
  }

  public ArrayList<Items> getInventario() {
    ArrayList<Items> newInvent = new ArrayList(this.inventario);
    return newInvent;
  }

  public void addInventario(Items item) {
    this.inventario.add(item);
  }

  public ArrayList<Cliente> clientesGustosos(Items item){
    ArrayList<Cliente> clientesGustosos = new ArrayList<>();
    for(Cliente cliente : this.clientes){
      if(cliente.esFavorito(item)){
        clientesGustosos.add(cliente);
      }
    }
    return clientesGustosos;
  }
}
