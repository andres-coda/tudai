import java.util.ArrayList;

public abstract class Causas extends Nombre{
    private ArrayList<Patologicos> sintomas;
   
    protected Causas(String nombre){
        super(nombre);
        this.sintomas = new ArrayList<Patologicos>();
    }
    
    public ArrayList<Patologicos> getSintomas() {
        ArrayList<Patologicos> newSintomas = this.sintomas;
        return newSintomas;
    }
    public void setSintomas(ArrayList<Patologicos> sintomas) {
        this.sintomas = sintomas;
    }  
    
    public void addSintomas(Patologicos sintoma){
        if (!this.getSintomas().contains(sintoma)){
            this.sintomas.add(sintoma);
        }
    }
}
