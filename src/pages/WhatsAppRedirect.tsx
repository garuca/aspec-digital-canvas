import { useEffect } from "react";

const WhatsAppRedirect = () => {
  useEffect(() => {
    window.location.replace("https://wa.me/5562982412665");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground p-4">
      <div className="text-center max-w-md p-6 bg-card rounded-2xl shadow-xl border border-border">
        <h2 className="text-2xl font-bold mb-2">Redirecionando...</h2>
        <p className="text-muted-foreground mb-4">Você está sendo redirecionado para o WhatsApp.</p>
        <p className="text-sm">
          Se não for redirecionado em instantes,{" "}
          <a
            href="https://wa.me/5562982412665"
            className="text-primary font-bold hover:underline"
            rel="noopener noreferrer"
          >
            clique aqui para continuar
          </a>.
        </p>
      </div>
    </div>
  );
};

export default WhatsAppRedirect;
