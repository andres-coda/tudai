import java.util.ArrayList;

public class BusquedaPalabraClave extends CondicionNoticias {
    ArrayList<String> palabrasClave;

    public BusquedaPalabraClave(ArrayList<String> palabrasClave) {
        this.palabrasClave = palabrasClave;
    }

    @Override
    public boolean cumple(Noticia n) {
        for (String pc : palabrasClave) {
            if(!n.getPalabraClave().contains(pc)) return false;        
        }        
        return true;
    }

    
    
}
