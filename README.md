# KRONOS-LOGISTICA-
docker-compose up --build -d
curl -X POST http://localhost:3000/generate -H "Content-Type: application/json" -d '{"containerId":"KRNU 847102 3","logPath":"./logs/audit_trail_VLP_RTM_847102.log"}'

# Te devuelve QR + hash + verifyUrl
# Escaneas QR del contenedor real y abre:
# https://kronos-assurance.global/verify?hash=...