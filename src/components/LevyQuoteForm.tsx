import { useState, useEffect } from "react";
import { MapPin, User, Package, Send, Check } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const states = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export function LevyQuoteForm() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({
    nome: "", whatsapp: "", email: "",
    tipo: "residencial",
    origem: "", destino: "",
    data: "", inventario: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 text-center shadow-lg">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#1a365d]">Orçamento Solicitado!</h3>
        <p className="mt-2 text-gray-600">
          Recebemos sua solicitação. Nossa equipe retornará em até 2 horas úteis.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-[#1a365d] mb-6">Solicite seu Orçamento</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Seu nome"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
          <input
            type="tel"
            required
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            placeholder="(00) 00000-0000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="seu@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de serviço</label>
          <select
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
          >
            <option value="residencial">Mudança Residencial</option>
            <option value="comercial">Mudança Comercial</option>
            <option value="frete">Transporte de Carga</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Datapreferida</label>
          <input
            type="date"
            required
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de origem</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={form.origem}
              onChange={(e) => setForm({ ...form, origem: e.target.value })}
              placeholder="Rua, número, bairro"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Endereço de destino</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              required
              value={form.destino}
              onChange={(e) => setForm({ ...form, destino: e.target.value })}
              placeholder="Rua, número, bairro"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição dos itens (inventário)</label>
          <div className="relative">
            <Package className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <textarea
              required
              value={form.inventario}
              onChange={(e) => setForm({ ...form, inventario: e.target.value })}
              placeholder="Liste os principais itens a serem transportados..."
              rows={4}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2B6CB0] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#2B6CB0] to-[#1a365d] rounded-lg font-semibold text-white hover:shadow-lg transition-all"
      >
        <Send className="w-5 h-5" />
        Solicitar Orçamento
      </button>
    </form>
  );
}

export default LevyQuoteForm;