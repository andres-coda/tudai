import java.util.ArrayList;

public class CondicionBateria extends Condicion {
    private int bateria;
    private ArrayList<String> instrucciones;

    public CondicionBateria(int bateria, ArrayList<String> instrucciones ) {
        this.bateria = bateria;
        this.instrucciones= instrucciones;
    }

    @Override
    public boolean cumple(ElementoKiko e) {
        for (String inst : instrucciones) {
            if(e.contieneInstruccion(inst)){
                if (e.gastoBateria()<bateria){
                    return true;
                }
            }
        }
        return false;
    }
    

    
}
