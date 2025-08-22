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
type Body = {
	title: string
}
type Params = {
	id: string
}

const courses: Course[] = [
	{ id: "34asd", title: "Curso de Node" },
	{ id: "5fad", title: "Curso de Fastify" },
	{ id: "6asda", title: "Curso de React" },
]

server.get("/courses", (req, reply) => {
	return { courses }
})

server.get("/courses/:id", (req, reply) => {
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
	const id = randomUUID()
	const body = req.body as Body
	const title = body.title

	if (!id) {
		return reply.status(400).send({ message: "Título Obrigatório!" })
	}

	courses.push({ id, title })
	return reply.status(201).send({ id })
})

server.put("/courses/:id", (req, reply) => {
	const body = req.body as Body
	const title = body.title

	const params = req.params as Params
	const id = params.id

	const course = courses.find((course) => course.id === id)

	if (!course) {
		return reply.status(404).send({ error: "Curso não encontrado" })
	}

	if (title !== undefined) course.title = title

	return reply.status(200).send({ message: "Sucesso!" })
})

server.delete("/courses/:id", (req, reply) => {
	const params = req.params as Params
	const id = params.id
	console.log(id)

	const courseId = courses.findIndex((course) => course.id === id)
	console.log(courseId)

	if (courseId === -1)
		return reply.status(404).send({ error: "Curso não encontrado" })

	courses.splice(courseId, 1)

	return reply.status(200).send({ message: "Curso removido com sucesso!" })
})

server.listen({ port: 3000 }).then(() => {
	console.log("Servidor ligado!")
})
