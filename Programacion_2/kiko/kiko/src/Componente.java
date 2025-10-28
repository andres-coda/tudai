public class Componente extends ElementoKiko {
    private String instruccion;
    private int bateria;
    private int tiempo;    

    public Componente(String instruccion, int bateria, int tiempo) {
        this.instruccion = instruccion;
        this.bateria = bateria;
        this.tiempo = tiempo;
    }

    public String getInstruccion(){
        return this.instruccion;
    }

    @Override
    public int gastoBateria() {
        return this.bateria;
    }
    @Override
    public int tiempoTranscurrido() {
        return this.tiempo;
    }

    @Override
    public int contador() {
        return 0;
    }

    @Override
    public ElementoKiko copiar(Condicion c) {
        if(c.cumple(this)){
            return new Componente(instruccion, bateria, tiempo);
        }
        return null;
    }

    @Override
    public boolean contieneInstruccion(String inst) {
        return this.getInstruccion().equals(inst);
    }    

    

    
    
}
