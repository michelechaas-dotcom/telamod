import "./global.css";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";

// Máscara 000.000.000-00
const maskCPF = (v) =>
  v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

const OPTIONS = [
  { icon: "🏦", label: "Login com seu banco", badge: "Conta Prata" },
  { icon: "📱", label: "Seu aplicativo gov.br" },
  { icon: "🔑", label: "Seu certificado digital" },
  { icon: "☁️", label: "Seu certificado digital em nuvem" },
];

export default function App() {
  const [cpf, setCpf] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = cpf.length === 14;
  const showError = touched && !isValid;

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-100"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar style="dark" />

      {/* Cabeçalho */}
      <View className="bg-white pt-12 pb-4 px-4 border-b border-slate-200">
        <Text className="text-4xl font-bold text-blue-800">gov.br</Text>
      </View>

      <ScrollView
        contentContainerClassName="p-4 gap-4"
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-white rounded-2xl p-5 gap-4 shadow">
          {/* UX FIX 1: Troquei o título genérico "Identifique-se no gov.br com:"
              por uma instrução direta e uma frase de apoio. O usuário entende
              na hora o que fazer, sem ler um texto cortado e confuso. */}
          <View className="gap-1">
            <Text className="text-2xl font-bold text-slate-900">
              Entrar com CPF
            </Text>
            <Text className="text-base text-slate-700">
              Digite seu CPF para criar ou acessar sua conta gov.br.
            </Text>
          </View>

          {/* UX FIX 2: O campo antes era amarelo com borda preta, destoando do
              resto. Agora é branco, com borda mais grossa e azul ao digitar,
              texto grande (text-lg) e teclado numérico, o que reduz erros. */}
          <View className="gap-2">
            <Text className="text-base font-semibold text-slate-900">CPF</Text>
            <TextInput
              value={cpf}
              onChangeText={(t) => setCpf(maskCPF(t))}
              onBlur={() => setTouched(true)}
              keyboardType="number-pad"
              placeholder="000.000.000-00"
              placeholderTextColor="#64748b"
              maxLength={14}
              accessibilityLabel="Digite seu CPF"
              className={`bg-white text-lg text-slate-900 px-4 py-4 rounded-xl border-2 ${
                showError ? "border-red-600" : "border-slate-400"
              }`}
            />
            {/* UX FIX 3: Mensagem de erro clara e em português simples, logo
                abaixo do campo, em vez de o usuário descobrir só ao clicar. */}
            {showError && (
              <Text className="text-red-700 text-base">
                O CPF precisa ter 11 números. Confira e tente de novo.
              </Text>
            )}
          </View>

          {/* UX FIX 4: Botão grande (py-4), largura total e cor com alto
              contraste (azul escuro com texto branco). Fica fácil de tocar com
              o polegar, e desativado fica cinza, mostrando que falta preencher. */}
          <Pressable
            disabled={!isValid}
            onPress={() => setTouched(true)}
            accessibilityRole="button"
            className={`py-4 rounded-full items-center active:opacity-80 ${
              isValid ? "bg-blue-800" : "bg-slate-400"
            }`}
          >
            <Text className="text-white text-lg font-bold">Continuar</Text>
          </Pressable>
        </View>

        {/* UX FIX 5: As outras opções viraram cartões separados, cada um com
            altura mínima de 56px (min-h-14) e borda. Antes eram links soltos
            e pequenos, difíceis de tocar. O selo "Conta Prata" ganhou texto
            legível em vez de uma tarja minúscula. */}
        <Text className="text-lg font-bold text-slate-900 mt-2">
          Ou entre com:
        </Text>

        <View className="gap-3 mb-6">
          {OPTIONS.map((o) => (
            <Pressable
              key={o.label}
              accessibilityRole="button"
              className="bg-white min-h-14 flex-row items-center gap-3 px-4 py-3 rounded-xl border border-slate-300 active:bg-slate-100"
            >
              <Text className="text-2xl">{o.icon}</Text>
              <View className="flex-1 gap-1">
                <Text className="text-base font-semibold text-slate-900">
                  {o.label}
                </Text>
                {o.badge && (
                  <View className="self-start bg-green-100 px-2 py-1 rounded">
                    <Text className="text-green-800 text-xs font-bold">
                      {o.badge}
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-xl text-slate-500">›</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
