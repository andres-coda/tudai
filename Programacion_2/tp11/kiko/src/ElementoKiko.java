public abstract class ElementoKiko {
    public abstract int gastoBateria();
    public abstract int tiempoTranscurrido();
    public abstract int contador();
    public abstract ElementoKiko copiar(Condicion c);
    public abstract boolean contieneInstruccion(String inst);
}
