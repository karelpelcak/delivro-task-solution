# DELIVRO TASK SOLUTION
#### [Task Link](https://github.com/ryzzaki/delivro-task)

### ToDo
- [x] Setup backend ([Fastify + Typescript](https://fastify.dev/docs/latest/Reference/TypeScript/))
- [x] Setup Frontend ([NextJS + Tailwind](https://nextjs.org/docs/app/getting-started/installation), [Storybook](https://storybook.js.org/docs/get-started/frameworks/nextjs))
- [ ] Setup Dockerfiles nad docker-compose
- [ ] Components
- [x] Endpoints
- [ ] Deploy web to hosting [Self hosted](https://taks.karelpelcak.eu)
- [ ] I18N translations

## View components in storybook
```bash
cd frontend
npm i
npm run storybook
open in browser localhost:6006
```

## Run Frontend
```bash
cd frontend
npm i
npm run dev
```
This url open in browser:
```
http://localhost:3000
```

## Run Backend
Duplicate `.env.example` and rename to `.env` and here put connection link to DATABASE_URL=
if used docker-compose use this connection URL: 
`postgres://appuser:secretpassword@localhost:5432/appdb`

```bash
npm i
npx drizzle-kit push
npm run dev
```
This url is for backend:
```
http://localhost:3000
```

## Run in docker
```bash
docker compose up -d
```