# DELIVRO TASK SOLUTION
#### [Task Link](https://github.com/ryzzaki/delivro-task)

### ToDo
- [x] Setup backend ([Fastify + Typescript](https://fastify.dev/docs/latest/Reference/TypeScript/))
- [x] Setup Frontend ([NextJS + Tailwind](https://nextjs.org/docs/app/getting-started/installation), [Storybook](https://storybook.js.org/docs/get-started/frameworks/nextjs))
- [x] Setup Dockerfiles nad docker-compose
- [x] Components
- [x] Endpoints
- [x] Deploy web to hosting [Self hosted](https://taks.karelpelcak.eu)
- [x] I18N translations

### Used libs
- Next-Intl
- Lucide-react icons
- clsx
- drizzle-orm
- Tanstack table
- react-toastify

## View components in storybook
```bash
cd frontend
npm i
npm run storybook
```
This url open in browser if not open automaticly:
```
http://localhost:6006
```
## Run by NPM
### Run Frontend
```bash
cd frontend
npm i
npm run dev
```
This url open in browser:
```
http://localhost:3000
```

### Run Backend
Duplicate `.env.example` and rename to `.env` and here put connection link to DATABASE_URL=
if used docker-compose use this connection URL: 
`postgres://appuser:secretpassword@localhost:5432/appdb`

```bash
cd backend
npm i
npx drizzle-kit push
npm run dev
```
This is url for backend:
```
http://localhost:8080
```

## Run in docker
```bash
docker compose up -d
```

### AI Usage
- Mock data for storybook stories
- Components skeletons
- Drizzle SQL Queries (Used this lib just few times and still learning it)
- To explain some errors
- Complete Dockerfiles and docker-compose

## Time spent
Approx 8-9 hours