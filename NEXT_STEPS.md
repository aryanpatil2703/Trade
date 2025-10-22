# Next Steps (Manual)

- Request Blockscout credits in EthGlobal Discord with:
  "Please top up account for <email>"
- Launch an Autoscout instance at `https://deploy.blockscout.com/` using your Mumbai RPC
- Set `NEXT_PUBLIC_BLOCKSCOUT_INSTANCE_URL` in `frontend/.env.local`
- Replace placeholder CIDs, tx hashes, and addresses after you mint and deploy
- Deploy contracts to Mumbai and paste addresses into frontend `.env.local`
- Record demo clips per `demo_videos/how_to_demo.md`

## Commands

- Install all deps: `npm run install:all`
- Start backend: `npm run dev:backend`
- Start frontend: `npm run dev:frontend`
- Compile contracts: `npm run compile`
- Deploy (Mumbai): `npm run deploy:mumbai`
