import fastify from "fastify"
import { randomUUID } from "node:crypto"

const server = fastify({
	logger: {
		enabled: true,
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
})

type Course = {
	id: string
	title: string
}

const courses: Course[] = [
	{ id: "1", title: "Curso de Node" },
	{ id: "2", title: "Curso de Fastify" },
	{ id: "3", title: "Curso de React" },
]

server.get("/courses", (req, reply) => {
	return { courses }
})

server.get("/courses/:id", (req, reply) => {
	type Params = {
		id: string
	}
	const params = req.params as Params
	const id = params.id

	const course = courses.find((course) => {
		return id === course.id
	})
	if (course) {
		return reply.status(200).send({ course })
	}
	return reply.status(404).send({ message: "Curso não encontrado!" })
})

server.post("/courses", (req, reply) => {
	type Body = {
		title: string
	}

	const id = randomUUID()
	const body = req.body as Body
	const title = body.title

	if (!id) {
		return reply.status(400).send({ message: "Título Obrigatório!" })
	}

	courses.push({ id, title })
	return reply.status(201).send({ id })
})

server.listen({ port: 3000 }).then(() => {
	console.log("Servidor ligado!")
})
