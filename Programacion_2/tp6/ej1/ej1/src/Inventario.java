import java.util.ArrayList;

public class Inventario {
  private ArrayList<Items> items;

  public Inventario() {
    items = new ArrayList<Items>();
  }

  public void addItems(Items item){
    if(items.contains(item)){
      item.incrementCantidad();
    } else {
      items.add(item);
    }
  }

  public void substractItem(){

  }
  
}
