# 📝 Registro de entrega da equipe

**Aplicação presencial:** 18/11/2026. **Entrega:** até 19/11/2026 às 12h (horário de Recife), via Google Forms.

## 👥 Integrantes

- Andrews Queiroz Franquelino e Silva
- Arthur Marques Ferreira
- Enzo Amorim Barbosa da Silva

## 🛠️ Correções de modelagem

Problemas encontrados no schema inicial e correções feitas (nova migration `20261118231342_correcao_schema`, mantendo a migration inicial):

1. `Session.capacity` estava opcional no banco. A capacidade passou a ser obrigatória (`SET NOT NULL`), pois toda sessão deve ter capacidade definida.
2. Faltava unicidade de inscrição por participante e sessão. Foi adicionado `@@unique([attendeeId, sessionId])` em `Registration` (índice único `Registration_attendeeId_sessionId_key`), garantindo a regra também no banco.

## 🔌 Endpoints e evidências

| Endpoint | Situação | Evidência de sucesso | Evidência de erro |
|---|---|---|---|
| 1 | (grupo preencher) | | |
| 2 | Concluído | `GET /api/events/1/occupancy` → **200** (JSON com as estatísticas do evento e porcentagem das sessões) | `GET /api/events/999/occupancy` → **404** `{"error":"EVENT_NOT_FOUND","message":"Evento não encontrado."}` |
| 3 | (grupo preencher) | | |
| 4 | Concluído | `PATCH /api/registrations/1`, body `{"sessionId": 6}` → **200** (inscrição atualizada) | `PATCH /api/registrations/1`, body `{"sessionId": 8}` → **409** `{"error":"DIFFERENT_EVENT","message":"A troca de sessão é permitida apenas dentro do mesmo evento."}` |
| 5 | Concluído | `DELETE /api/registrations/1` → **204** (No Content, inscrição excluída e vaga liberada) | `DELETE /api/registrations/999` → **404** `{"error":"REGISTRATION_NOT_FOUND","message":"Inscrição não encontrada."}` |

## 💡 Observações

**Dificuldades:**
O principal desafio do grupo foi a criação e a tipagem (TypeScript) dos endpoints. Embora tenhamos conseguido identificar e corrigir os bugs iniciais com bastante rapidez, a estruturação e implementação lógica das rotas exigiu bastante esforço. Para otimizar nosso fluxo de trabalho, optamos por desenvolver os endpoints na seguinte ordem: 1 -> 3 -> 2 -> 4 -> 5.

**Limitações:**
Nossa maior barreira durante o projeto foi a curva de aprendizado técnica. Tínhamos limitações de conhecimento prévio sobre como estruturar, tipar e lidar com requisições HTTP utilizando TypeScript, o que tornou o processo inicial um pouco mais lento até pegarmos o ritmo.

**Conquistas e Gamificação:**
Consideramos como uma conquista o fato de termos conseguido finalizar 3 endpoints ainda durante o tempo de aula. No entanto, infelizmente não houve tempo hábil para a validação do professor presencialmente. Por conta disso, acabamos finalizando a dinâmica sem pontuar e sem resgatar os prêmios da gamificação. Faz parte do processo, acontece, mas o aprendizado técnico que levamos da atividade compensou o esforço.