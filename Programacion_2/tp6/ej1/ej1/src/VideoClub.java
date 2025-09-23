

public class VideoClub {
   private Inventario inventario;

   public VideoClub(){
    inventario = new Inventario();
   }

   public Inventario getInventario() {
     return inventario;
   }

   public void setInventario(Inventario inventario) {
     this.inventario = inventario;
   }   

   public void addItems(Items item){
    this.inventario.addItems(item);
   }
}
