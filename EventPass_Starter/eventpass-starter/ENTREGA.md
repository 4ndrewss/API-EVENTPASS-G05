# Registro de entrega da equipe

**Aplicação presencial:** 18/11/2026. **Entrega:** até 19/11/2026 às 12h (horário de Recife), via Google Forms.

## Integrantes

- Nome completo: Andrews Queiroz (CONFIRMAR grafia)
- Nome completo: Arthur Ferreira (CONFIRMAR grafia)
- Nome completo: Enzo Amorim

## Correções de modelagem

Problemas encontrados no schema inicial e correções feitas (nova migration `20261118231342_correcao_schema`, mantendo a migration inicial):

1. `Session.capacity` estava opcional no banco. A capacidade passou a ser obrigatória (`SET NOT NULL`), pois toda sessão deve ter capacidade definida.
2. Faltava unicidade de inscrição por participante e sessão. Foi adicionado `@@unique([attendeeId, sessionId])` em `Registration` (índice único `Registration_attendeeId_sessionId_key`), garantindo a regra também no banco.

## Endpoints e evidências

| Endpoint | Situação | Evidência de sucesso | Evidência de erro |
|---|---|---|---|
| 1 | (grupo preencher) | | |
| 2 | (grupo preencher) | | |
| 3 | (grupo preencher) | | |
| 4 | Concluído | `PATCH /api/registrations/1`, body `{"sessionId": 6}` → **200** (inscrição atualizada) | `PATCH /api/registrations/1`, body `{"sessionId": 8}` → **409** `{"error":"DIFFERENT_EVENT","message":"A troca de sessão é permitida apenas dentro do mesmo evento."}` |
| 5 | (grupo preencher) | | |

Endpoint 4 (PATCH): valida o ID da rota e o body com Zod (somente `sessionId`, sem campos extras); retorna 404 se a inscrição ou a sessão não existir; 409 se a sessão original já começou, se a nova sessão for a mesma, de outro evento, indisponível, lotada, com inscrição duplicada ou com conflito de horário (desconsiderando a própria inscrição).

## Observações

Descreva dificuldades, limitações e, quando aplicável, conquistas da gamificação. (grupo preencher)

