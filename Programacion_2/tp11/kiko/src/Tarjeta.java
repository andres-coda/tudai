import java.util.ArrayList;

public class Tarjeta extends ElementoKiko {
    private ArrayList<ElementoKiko> elementos;
    private static int constante;
    private int iteracion;

    public Tarjeta(int iteracion){
        this.iteracion = iteracion;
        constante = 5;
    }

    public void addElemento(ElementoKiko elemento){
        this.elementos.add(elemento);
    }

    public boolean sizeElemento(){
        return this.elementos.size()!=0;
    }

    public static void setConstante(int constante) {
        Tarjeta.constante = constante;
    }

    @Override
    public int gastoBateria() {
        int suma = 0;
        for (ElementoKiko e : elementos) {
            suma += e.gastoBateria();
        }
        return suma;
    }

    @Override
    public int tiempoTranscurrido() {
        int suma = 0;
        for (ElementoKiko e : elementos) {
            suma += e.tiempoTranscurrido();
        }
        return suma;
    }

    @Override
    public int contador() {
        int suma = 1;
        for (ElementoKiko e : elementos) {
            suma +=e.contador();
        }
        return suma;
    }

    @Override
    public ElementoKiko copiar(Condicion c) {
        if(!this.sizeElemento()) return null;
        Tarjeta newElemento = new Tarjeta(iteracion);
        for (ElementoKiko e : elementos) {
            ElementoKiko aux= e.copiar(c) ;
            if(aux!=null){
                newElemento.addElemento(aux);
            }
        }
        if(!newElemento.sizeElemento()){
            return null;
        }
        return newElemento;
    }

    @Override
    public boolean contieneInstruccion(String inst) {
        for (ElementoKiko e : elementos) {
            if(e.contieneInstruccion(inst)){
                return true;
            };
        }
        return false;
    }  
    
    
}
